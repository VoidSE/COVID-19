var ec_left2 = echarts.init(document.getElementById('div1'), "dark");

option = {
    title: {
        show: false,
        text: '基础雷达图'
    },
    tooltip: {},
    grid: {
        // bottom: 150,
        // top: 20,
        // right: 0,
        // left: 50,
        // height: 300,
        position: 'bottom'
    },
    legend: {
        data: ['确诊', '治愈'],
        right: 'right',
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: 'white',
                // backgroundColor: '#00567b',
                backgroundColor: '#111619',
                fontSize: 12,
                //backgroundColor: 'yellow',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '湖南', max: 40000},
            { name: '北京', max: 40000},
            { name: '湖北', max: 40000},
            { name: '广东', max: 40000},
            { name: '四川', max: 40000}
        ],
        splitArea : {
            show : false,
            areaStyle : {
                color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
        },
        splitLine : {
            show : true,
            lineStyle : {
                width : 1,
                color : 'rgba(131,141,158,.1)', // 设置网格的颜色
            },
        },
    },
    series: [{
        name: '确诊 vs 治愈',
        type: 'radar',
        zoom: 1.2,
        areaStyle: {
            normal: {
                opacity: 0.2,
            },
            //color: ['#4d1826', '#02879d'],
        },
        data: [
            {
                value: [4000, 10000, 28000, 35000, 30000],
                name: '确诊'
            },
            {
                value: [5000, 14000, 28000, 31000, 6000],
                name: '治愈'
            },
        ],
    }],
    backgroundColor: '#111619'
    //backgroundColor: 'yellow',
};

ec_left2.setOption(option)