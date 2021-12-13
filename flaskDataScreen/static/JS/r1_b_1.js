var dom = document.getElementById("r1_b_1");
var ec_r1_b_1 = echarts.init(dom);
var app = {};

var r1_b_1_option = {
    title: {
        show: true,
        text: "确诊：治愈",
        textStyle: {
            color: 'white',
            fontSize: '12px',
        },
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show: false,
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                textStyle: {
                    color: '#ffc800',
                },
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '10',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            // data: [
            //     {value: 102363, name: '累计确诊'},
            //     {value: 96000, name: '累计治愈'},
            // ]
            // data: [{"value" :102363, "name": '累计确诊'}, {"value": 96000, "name": '累计治愈'}]
            data: []
        },
    ],
    // color: ['#00d0ea', '#00fe60'],
    color: ['#e3ee00', '#00ff7a']
};

ec_r1_b_1.setOption(r1_b_1_option)