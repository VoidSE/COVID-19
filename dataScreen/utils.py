import pymysql

# 获取数据库链接，光标对象
def get_conn():
    conn = pymysql.connect(host="127.0.0.1", port=3306, user="studyuser", password="123", database="cov", charset="utf8")
    if conn == None:
        print("数据库链接失败！")
    else:
        print("数据库链接成功！")
    cursor = conn.cursor()

    return conn, cursor


# 释放资源
def close(conn, cursor):
    cursor.close()
    conn.close()
