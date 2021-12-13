var dom = document.getElementById("r1_b_3");
var ec_r1_b_3 = echarts.init(dom);
var app = {};


r1_b_3_option = {
    title: {
        show: true,
        text: "治愈：死亡",
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
            //     {value: 96000, name: '累计治愈'},
            //     {value: 4849, name: '累计死亡'},
            // ]
            data: []
        }
    ],
    color: ['#00ff7a', '#00e1ff'],
};

ec_r1_b_3.setOption(r1_b_3_option)