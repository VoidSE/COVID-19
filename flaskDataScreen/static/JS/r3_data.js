var ec_r3_data = echarts.init(document.getElementById('r3_data'), "dark")

 var r3_data_option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '15%',
        left: '2%',
        right: '10%',
        bottom: '3%',
        containLabel: true,
    },
    legend: {
        show: true,
        left: 'right',
        data: ['已确诊', '已治愈']
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        splitLine: {
            show: false,
        },
        axisLabel: {
            rotate: 35,
        }
    },
    yAxis: {
        type: 'category',
        //data: ['北京', '湖北', '四川', '广东', '湖南'],
        data: [],
        inverse: false,
    },
    series: [
        {
            name: '已确诊',
            type: 'bar',
            barWidth: 13,
            itemStyle: {
                emphasis: {
                    barBorderRadius: 2
                },
                normal: {
                    barBorderRadius: 2
                }
            },
            //data: [5000, 10000, 15000, 30000, 40000],
            data: [],
            color: new echarts.graphic.LinearGradient(
                      0, 0, 1, 0,    //参数设置为0, 0, 1, 0可以从左到右渐变. 设置为0,0,0,1可以从上到下渐变
                      [
                          {offset: 0, color: '#2d6b82'},                   //柱图渐变色
                          {offset: 0.5, color: '#2da096'},                 //柱图渐变色
                          {offset: 1, color: '#26eba8'},                   //柱图渐变色
                      ]
                  )
        },
        {
            name: '已治愈',
            type: 'bar',
            barWidth: 13,
            itemStyle: {
                emphasis: {
                    barBorderRadius: 2
                },
                normal: {
                    barBorderRadius: 2
                }
            },
            //data: [4900, 9999, 14000, 20000, 30000],
            data: [],
            color: new echarts.graphic.LinearGradient(
                      0, 0, 1, 0,    //参数设置为0, 0, 1, 0可以从左到右渐变. 设置为0,0,0,1可以从上到下渐变
                      [
                          {offset: 0, color: '#9d8a61'},                  //柱图渐变色
                          {offset: 0.5, color: '#c5924c'},                //柱图渐变色
                          {offset: 1, color: '#eb8b18'}                   //柱图渐变色
                      ]
                )
        }
    ],
    backgroundColor: '#111619',
};

ec_r3_data.setOption(r3_data_option)
