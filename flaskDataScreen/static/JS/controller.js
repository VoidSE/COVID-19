// 发送ajax请求获取系统时间
function get_sys_time() {
    $.ajax({
        url: "/get_sys_time",
        type: "post",
        success: function (data) {
            $("#time").html(data)
        },
        error: function(xhr, type, errorThrown){

        }
    })
}

// 获取right1中数据
// 累计确诊，累计治愈， 累计死亡
// 对比扇形
function get_right1() {
    $.ajax({
        url: "/get_right1",
        type: "post",
        success: function (data) {
            $(".num_data").eq(0).html(data['confirm'])
            $(".num_data").eq(1).html(data['heal'])
            $(".num_data").eq(2).html(data['dead'])

            var data1 = [{"value": data['confirm'], "name": '累计确诊'}, {"value": data['heal'], "name": '累计治愈'}]
            r1_b_1_option.series[0].data = data1
            ec_r1_b_1.setOption(r1_b_1_option)
            var data2 = [{"value": data['confirm'], "name": '累计确诊'}, {"value": data['dead'], "name": '累计死亡'}]
            r1_b_2_option.series[0].data = data2
            ec_r1_b_2.setOption(r1_b_2_option)
            var data3 = [{"value": data['heal'], "name": '累计治愈'}, {"value": data['dead'], "name": '累计死亡'}]
            r1_b_3_option.series[0].data = data3
            ec_r1_b_3.setOption(r1_b_3_option)
        },
        error: function () {

        }
    })
}

// 获取right2
function get_right2(){
    $.ajax({
        url: "/get_right2",
        type: "post",
        success: function (datas) {
            right2_option.xAxis[0].data=datas.day
            right2_option.series[0].data=datas.confirm_add
            right2_option.series[1].data=datas.suspect_add
            ec_right2_data.setOption(right2_option)
        },
        error: function () {

        }
    })
}

// 获取right3
function get_right3(){
    $.ajax({
        url: "/get_right3",
        type: "post",
        success: function (datas) {
            r3_data_option.yAxis.data=datas.province
            r3_data_option.series[0].data=datas.confirm
            r3_data_option.series[1].data=datas.heal
            ec_r3_data.setOption(r3_data_option)
        },
        error: function () {

        }
    })
}

//获取left1
function get_left1() {
    $.ajax({
        url: "/get_left1",
        type: "post",
        success: function (data) {
            $("#left_c1_2 .lc3").eq(0).html(data['confirm_add'])
            $("#left_c1_2 .lc3").eq(1).html(data['city'])
        },
        error: function () {

        }
    })
}

//获取left2
function get_left2() {
    $.ajax({
        url: "/get_left2",
        type: "post",
        success: function (data) {
            $("#left_c2_2 .lc3").eq(0).html(data['outside'])
            $("#left_c2_2 .lc3").eq(1).html(data['city'])
            $("#left_c2_3 .lc3").eq(0).html(data['confirm'])
        },
        error: function () {

        }
    })
}
// 获取left3
function get_left3(){
    $.ajax({
        url: "/get_left3",
        type: "post",
        success: function (datas) {
            left_c2_5_option.xAxis.data=datas.day
            left_c2_5_option.series[0].data=datas.outside_add
            ec_left_c2_5.setOption(left_c2_5_option)
        },
        error: function () {

        }
    })
}


// 获取left4
function get_left4(){
    $.ajax({
        url: "/get_left4",
        type: "post",
        success: function (datas) {
            left_c3_2_option.xAxis[0].data = datas['day']
            left_c3_2_option.series[0].data = datas['confirm']
            left_c3_2_option.series[1].data = datas['suspect']
            left_c3_2_option.series[2].data = datas['heal']
            left_c3_2_option.series[3].data = datas['dead']
            ec_left_c3_2.setOption(left_c3_2_option)
        },
        error: function () {

        }
    })

}

// 获取center1地图
function get_center1(){
    $.ajax({
        url: "/get_center1",
        type: "post",
        success: function (datas) {
            ec_center_option.series[0].data = datas['data']
            ec_center.setOption(ec_center_option)
        },
        error: function () {

        }
    })
}
//获取center1_alarm
function get_center1_alarm(){
    $.ajax({
        url: "/get_center1_alarm",
        type: "post",
        success: function (datas) {
            ec_center_option.series[1].data = convertData(datas['data'])
            ec_center.setOption(ec_center_option)
        },
        error: function () {

        }
    })
}

// 获取center2
function get_center2(){
    $.ajax({
        url: "/get_center2",
        type: "post",
        success: function (datas) {
            // day
            var day = datas['day']
            for (var i=0; i<day.length; i++)
            {
                $(".li1").eq(i).html(day[i])
            }
            // province
            var province = datas['province']
            for (var i=0; i<province.length; i++)
            {
                $(".li2").eq(i).html(province[i])
            }
            // city
            var city = datas['city']
            for (var i=0; i<city.length; i++)
            {
                $(".li3").eq(i).html(city[i])
            }
            // confirm_add
            var confirm_add = datas['confirm_add']
            for (var i=0; i<confirm_add.length; i++)
            {
                $(".li4").eq(i).html(confirm_add[i])
            }
            // now_confirm
            var now_confirm = datas['now_confirm']
            for (var i=0; i<now_confirm.length; i++)
            {
                $(".li5").eq(i).html(now_confirm[i])
            }
            // confirm
            var confirm = datas['confirm']
            for (var i=0; i<confirm.length; i++)
            {
                $(".li6").eq(i).html(confirm[i])
            }
            // heal
            var heal = datas['heal']
            for (var i=0; i<heal.length; i++)
            {
                $(".li7").eq(i).html(heal[i])
            }
            var parent = document.getElementById('parent');
            var child1 = document.getElementById('child1');
            var child2 = document.getElementById('child2');
            child2.innerHTML = child1.innerHTML;
            function scroll(){
                if(parent.scrollTop >= child1.scrollHeight) {
                    parent.scrollTop = 0;
                } else {
                    parent.scrollTop++;
                }
            }
            setInterval(scroll, 40);

        },
        error: function () {

        }
    })
}


// 定时器
setInterval(get_sys_time, 1000)
setInterval(get_right1, 1000)
setInterval(get_right2, 1000)
setInterval(get_right3, 1000)
setInterval(get_left1, 1000)
setInterval(get_left2, 1000)
setInterval(get_left3, 1000)
setInterval(get_left4, 1000)
//setInterval(get_center1, 1000)
setTimeout(get_center1, 1000)
setTimeout(get_center1_alarm, 1000)
//setInterval(get_center2, 1000)
setTimeout(get_center2, 1000)



