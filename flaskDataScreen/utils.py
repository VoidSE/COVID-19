import time
import pymysql
from flask import jsonify

# 获取系统当前时间
def get_sys_time():
    dt = time.strftime("%Y-%m-%d %X")
    return dt
# 获取系统当前日期
def get_sys_date():
    dt = time.strftime("%Y-%m-%d")
    return dt

# 获取数据库连接
def get_conn():
    conn = pymysql.connect(
        host='127.0.0.1', port=3306,
        user='studyuser', password='123',
        database='cov', charset='utf8'
    )
    cursor = conn.cursor()
    return conn, cursor

# 释放资源
def close(conn, cursor):
    cursor.close()
    conn.close()

# 查询数据库数据
def query(sql, *args):
    conn, cursor = get_conn()
    cursor.execute(sql, args)
    res = cursor.fetchall()
    return res

# 更新数据库数据
def update(sql, *args):
    conn, cursor = get_conn()
    try:
        cursor.execute(sql, args)
        conn.commit()
        res = 1
    except:
        res = 0
    return res

# 获取right1
# data: confirm, heal, dead
def get_right1():
    # 查询详情表
    sql = 'select sum(confirm), sum(heal), sum(dead) from details where update_time = (select update_time from details order by update_time desc limit 1);'
    res = query(sql)
    return res[0]

# 获取right2
def get_right2():
    sql = 'select ds,confirm_add,suspect_add from history'
    res = query(sql)
    return res

# 获取right3
def get_right3():
    sql = 'select sum(confirm), sum(heal), province from details group by province order by sum(confirm) desc limit 5'
    res = query(sql)
    return res

# 获取left1
def get_left1():
    sql_confirm = 'select sum(confirm_add) from details'
    res_confirm = query(sql_confirm)
    sql_city = 'select count(city) from details where confirm_add > 0'
    res_city = query(sql_city)
    return res_confirm[0], res_city[0]

# 获取left2
def get_left2():
    sql_outside = 'select sum(confirm_add) from details where city = "境外输入" and confirm_add > 0'
    res_outside = query(sql_outside)
    sql_city = 'select count(city) from details where city = "境外输入" and confirm_add > 0'
    res_city = query(sql_city)
    sql_confirm = 'select sum(confirm) from outside'
    res_confirm = query(sql_confirm)
    return res_outside[0], res_city[0], res_confirm[0]

# 获取left3
def get_left3():
    sql = 'select * from outside'
    res = query(sql)
    return res

# 获取left4
def get_left4():
    sql = 'select ds, confirm, suspect, heal, dead from history'
    res = query(sql)
    return res

# 获取center1地图
def get_center1():
    sql = 'select province,sum(confirm-heal-dead) from details where update_time=(select update_time from details order by update_time desc limit 1) group by province'
    res = query(sql)
    # print(res)
    return res

# 获取center1_alarm
# 省份 新增
def get_center1_alarm():
    sql = 'select province, confirm_add from details where confirm_add > 0'
    res = query(sql)
    return res

# 获取center2
# 日期 省份 城市 新增 现有 累计 治愈
def get_center2():
    sql = 'select update_time, province, city, confirm_add, (confirm-heal-dead), confirm, heal from details where confirm_add > 0'
    res = query(sql)
    # print(res)
    return res


