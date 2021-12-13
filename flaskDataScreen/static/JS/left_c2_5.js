var ec_left_c2_5 = echarts.init(document.getElementById('left_c2_5'), "dark");

left_c2_5_option = {
    tooltip: {
		trigger: 'axis',
		//指示器
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#7171C6'
			}
		},
	},
    grid: {
        left: '3%',
        right: '5%',
        top: '15%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['3.9', '3.10', '3.11', '3.12', '3.13', '3.14', '3.15']
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: ['新增境外输入'],
        //data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: [],
        type: 'line',
        areaStyle: {}
    }],
    backgroundColor: '#111619'
};

ec_left_c2_5.setOption(left_c2_5_option)