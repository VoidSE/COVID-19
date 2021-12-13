from selenium.webdriver import Chrome
import time
import utils
import requests
from bs4 import BeautifulSoup
import json
import datetime

'''
1、历史入库
ds  | confirm | confirm_add | suspect | suspect_add | heal     | heal_add | dead    | dead_add
日期 | 累计确诊 | 新增确诊      | 累计疑似 | 新增疑似      | 累计治愈  | 新增治愈   | 累计死亡 | 新增死亡
2、详细入库
id            | update_time     | province  | city  | confirm | confirm_add | heal  | dead 
序号（自生成）  | 更新时间（系统生成） | 省份      | 城市   | 累计确诊 | 新增确诊      | 累计治愈  | 累计死亡 
3、境外输入入库（每日新增数据）
日期 ｜ 境外输入
'''

# 获取历史数据
def get_history():
    history = {}
    url = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare"
    # url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=jQuery35109951686071687722_1618464553937&_=1618464553938"
    # url = "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1"
    }
    resp = requests.get(url, headers)
    json_data = resp.text
    # 把json字符串转化为字典
    datas = json.loads(json_data)

    # print(datas['data'])
    data_history = datas['data']
    ''' 查看json文件中的keys有哪些
    for item in data_history.keys():
        print(item)
        print(data_history[item])
    '''
    # print(data_history['chinaDayList'])
    for day in data_history['chinaDayList']:
        dt = day['y']+'.'+day['date']    # 获取时间
        tup = time.strptime(dt, "%Y.%m.%d")    # 先转换成元组
        dt = time.strftime("%Y-%m-%d", tup)    # 再转换成放入数据库的类型
        confirm = day['confirm']    # 确诊
        suspect = day['suspect']    # 疑似
        heal = day['heal']    # 出院
        dead = day['dead']    # 死亡
        history[dt] = {"confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead}
    # print(data_history['chinaDayAddList'])
    for dayadd in data_history['chinaDayAddList'][1:]:
        dt = dayadd['y'] + '.' + dayadd['date']    # 获取时间
        tup = time.strptime(dt, "%Y.%m.%d")  # 先转换成元组
        dt = time.strftime("%Y-%m-%d", tup)  # 再转换成放入数据库的类型
        confirm_add = dayadd['confirm']
        suspect_add = dayadd['suspect']
        heal_add = dayadd['heal']
        dead_add = dayadd['dead']
        history[dt].update({"confirm_add": confirm_add, "suspect_add": suspect_add,
                            "heal_add": heal_add, "dead_add": dead_add})
    print(history)
    return history

# 历史数据入库
def insert_history():
    conn, cursor = utils.get_conn()
    # 清空history表
    del_sql = 'truncate table history'
    cursor.execute(del_sql)
    conn.commit()
    # 插入数据
    history = get_history()
    sql = 'insert into history values(%s, %s, %s, %s, %s, %s, %s, %s, %s)'
    for k, v in history.items():
        cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("suspect"), v.get("suspect_add"), v.get("heal"), v.get("heal_add"), v.get("dead"), v.get("dead_add")])
        conn.commit()

    print("history数据插入成功！")
    utils.close(conn, cursor)

# 获取详细数据
def get_details():
    # 列表
    details = []

    url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1"
    }
    resp = requests.get(url, headers)
    json_data = resp.text
    datas = json.loads(json_data)
    data = json.loads(datas['data'])
    '''
    for item in data.keys():
        print(item)
        print(data['areaTree'])
    '''
    update_time = data['lastUpdateTime']
    country = data['areaTree'][0]
    provinces = country['children']
    for province in provinces:
        pro_name = province['name']
        for city in province['children']:
            city_name = city['name']
            confirm = city['total']['confirm']
            confirm_add = city['today']['confirm']
            heal = city['total']['heal']
            dead = city['total']['dead']

            details.append([update_time, pro_name, city_name,
                            confirm, confirm_add, heal, dead])

    print(details)
    return details

# details入库
def insert_details():
    conn, cursor = utils.get_conn()
    # 清空details表
    del_sql = 'truncate table details'
    cursor.execute(del_sql)
    conn.commit()
    details = get_details()
    # 执行插入数据
    sql = 'insert into details(update_time, province, city, confirm, confirm_add, heal, dead) values(%s, %s, %s, %s, %s, %s, %s)'
    # 查询数据库中的数据是否需要更新，如果需要更新则更新，不需要则提示
    sql_query = 'select %s=(select update_time from details order by id desc limit 1)'
    cursor.execute(sql_query, details[0][0])
    if not cursor.fetchone()[0]:
        print("开始更新数据！")
        for item in details:
            cursor.execute(sql, item)
            conn.commit()

        print("数据更新成功！")
    else:
        print("已经是最新数据，不需要更新！")

    utils.close(conn, cursor)

# 获取日期，境外输入
def get_outside():
    # 列表
    outside = []

    # url = "https://file1.dxycdn.com/2021/0316/760/8579614054253300743-135.json?t=26931764"
    # url = 'https://file1.dxycdn.com/2021/0328/672/7668618550606522743-135.json?t=26948485'
    url = "https://file1.dxycdn.com/2021/0415/635/8141037885426955743-135.json?t=26974421"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1"
    }
    resp = requests.get(url, headers)
    json_data = resp.text
    datas = json.loads(json_data)
    # print(datas)
    data = datas['data']
    for item in data:
        dt = str(item['dateId'])
        dc = datetime.datetime.strptime(dt, '%Y%m%d')
        dt = dc.strftime("%Y-%m-%d")
        ot = item['suspectedCountIncr']
        # print(dt)
        # print(ot)
        outside.append([dt, ot])

    print(outside)
    return outside

# 插入日期、境外输入
def insert_outside():
    conn, cursor = utils.get_conn()
    # 清空details表
    del_sql = 'truncate table outside'
    cursor.execute(del_sql)
    conn.commit()
    outside = get_outside()
    # 执行插入数据
    sql = 'insert into outside values(%s, %s)'
    print("开始更新数据！")
    for item in outside:
        cursor.execute(sql, item)
        conn.commit()

    print("数据更新成功！")
    utils.close(conn, cursor)

if __name__ == "__main__":
    insert_history()
    insert_details()
    insert_outside()