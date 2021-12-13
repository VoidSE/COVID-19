from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
from jieba.analyse import extract_tags
import string
import utils
import json

app = Flask(__name__)


@app.route('/', methods=['get', 'post'])
def hello_world():
    return render_template("index.html")

@app.route('/european', methods=['get', 'post'])
def european():
    return render_template("european.html")

@app.route('/add', methods=['get', 'post'])
def add():
    return render_template("add.html")

# 获取系统当前时间
@app.route('/get_sys_time', methods=['get', 'post'])
def get_sys_time():
    dt = utils.get_sys_time()
    return dt

# 获取right1
# data: confirm, heal, dead
@app.route('/get_right1', methods=['get', 'post'])
def get_right1():
    # 获取数据库中想要的数据
    res = utils.get_right1()
    # 把数据（元组）转换为json字符串
    return jsonify({"confirm": str(res[0]), "heal": str(res[1]), "dead": str(res[2])})

# 获取right2
# 国内新增数据
@app.route('/get_right2', methods=['get', 'post'])
def get_right2():
    data = utils.get_right2()
    day, confirm_add, suspect_add = [], [], []
    for a, b, c in data[7:]:
        day.append(a.strftime("%m-%d"))  # a是datatime类型
        confirm_add.append(b)
        suspect_add.append(c)
    return jsonify({"day": day, "confirm_add": confirm_add, "suspect_add": suspect_add})

# 获取right1
# 国内累计确诊前5
@app.route('/get_right3', methods=['get', 'post'])
def get_right3():
    data = utils.get_right3()
    confirm, heal, province = [], [], []
    for a, b, c in reversed(data):
        confirm.append(str(a))
        heal.append(str(b))
        province.append(str(c))
    return jsonify({"confirm": confirm, "heal": heal, "province": province})

# 获取left1
# 今日新增及地区
@app.route('/get_left1', methods=['get', 'post'])
def get_left1():
    res_confirm, res_city = utils.get_left1()
    return jsonify({"confirm_add": str(res_confirm[0]), "city": str(res_city[0])})

# 获取left2
# 今日新增及地区
@app.route('/get_left2', methods=['get', 'post'])
def get_left2():
    res_outside, res_city, res_confirm = utils.get_left2()
    return jsonify({"outside": str(res_outside[0]), "city": str(res_city[0]), "confirm": str(res_confirm[0])})

# 获取left3
# 境外输入新增趋势
@app.route('/get_left3', methods=['get', 'post'])
def get_left3():
    data = utils.get_left3()
    day, outside_add = [], []
    for a, b in data[-60:]:
        day.append(a.strftime("%m-%d"))  # a是datatime类型
        outside_add.append(b)
    return jsonify({"day": day, "outside_add": outside_add})

# 获取left4
# 国内累计趋势
@app.route('/get_left4', methods=['get', 'post'])
def get_left4():
    res = utils.get_left4()
    day, confirm, suspect, heal, dead = [], [], [], [], []
    for tup in res:
        day.append(tup[0].strftime("%m-%d"))
        confirm.append(tup[1])
        suspect.append(tup[2])
        heal.append(tup[3])
        dead.append(tup[4])
    return jsonify({"day": day, "confirm": confirm,
                    "suspect": suspect, "heal": heal,
                    "dead": dead})

# 获取center1
# 地图
@app.route('/get_center1', methods=['get', 'post'])
def get_center1():
    datas = []
    res = utils.get_center1()
    for item in res:
        datas.append({"name": item[0], "value": str(item[1])})
    return jsonify({"data": datas})

# 获取center1_alarm
@app.route('/get_center1_alarm', methods=['get', 'post'])
def get_center1_alarm():
    datas = []
    res = utils.get_center1_alarm()
    for item in res:
        datas.append({"name": item[0], "value": str(item[1])})
    return jsonify({"data": datas})

# 获取center2
# 滚动列表
@app.route('/get_center2', methods=['get', 'post'])
def get_center2():
    res = utils.get_center2()
    day, province, city, confirm_add, now_confirm, confirm, heal = [], [], [], [], [], [], []
    for tup in res:
        day.append(tup[0].strftime("%Y-%m-%d"))
        province.append(tup[1])
        city.append(tup[2])
        confirm_add.append(tup[3])
        now_confirm.append(tup[4])
        confirm.append(tup[5])
        heal.append(tup[6])

    return jsonify({"day": day, "province": province, "city": city,
                    "confirm_add": confirm_add, "now_confirm": now_confirm,
                    "confirm": confirm, "heal": heal})

# 接受confirm_form表单的数据
@app.route('/add_operate', methods=['get', 'post'])
def add_operate():
    data = json.loads(request.form.get('data'))
    province = data['province']
    city = data['city']
    confirm_add = data['confirm_add']
    password = data['password']
    if province == "" or city == "" or confirm_add == "" or password == "":
        return jsonify({"flag": 2})
    elif password != '111111':
        return jsonify({"flag": 3})
    else:
        # 更新details
        sql_d = "select confirm_add from details where province = '%s' and city = '%s'" % (province, city)
        res_d = utils.query(sql_d)
        result = res_d[0][0] + int(confirm_add)
        sql_details = "update details set confirm_add = '%d' where province = '%s' and city = '%s'"% (result, province, city)
        flag = utils.update(sql_details)
        return jsonify({"flag": int(flag)})
        # return jsonify({"confirm_add": confirm_add, "result": result})



if __name__ == '__main__':
    app.run()

