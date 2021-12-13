
# data: [{value: 102363, name: '累计确诊'}, {value: 96000, name: '累计治愈'}]

# res = (101958, 96621, 4845)
# data = [{"value": res[0], "name": '累计确诊'}, {"value": res[1], "name": '累计治愈'}]
#
# print(data)
import utils
from flask import jsonify

def get_center2():
    sql = 'select update_time, province, city, confirm_add, (confirm-heal-dead), confirm, heal from details where confirm_add > 0'
    res = utils.query(sql)
    print(res)
    return res

def app():
    res = get_center2()
    day, province, city, confirm_add, now_confirm, confirm, heal = [], [], [], [], [], [], []
    for tup in res:
        day.append(tup[0].strftime("%Y-%m-%d"))
        province.append(tup[1])
        city.append(tup[2])
        confirm_add.append(tup[3])
        now_confirm.append(tup[4])
        confirm.append(tup[5])
        heal.append(tup[6])

    print(day)
    print(len(day))

    return jsonify({"day": day, "province": province, "city": city,
                    "confirm_add": confirm_add, "now_confirm": now_confirm,
                    "confirm": confirm, "heal": heal})

if __name__ == "__main__":
    datas = app()