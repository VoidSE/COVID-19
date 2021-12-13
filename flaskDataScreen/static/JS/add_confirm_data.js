var city = [
        [],
        ["地区待确认","境外输入","乌鲁木齐","伊犁","昌吉","石河子","哈密","阿克苏","巴音郭楞","喀什","塔城","克拉玛依","和田",
            "阿勒泰","吐鲁番","阿拉尔","博尔塔拉","五家渠","克孜勒苏","图木舒克"],
        ["地区待确认","境外输入","拉萨","山南","林芝","日喀则","阿里","昌都","那曲"],
        ["地区待确认","境外输入","齐齐哈尔","哈尔滨","大庆","佳木斯","双鸭山","牡丹江","鸡西","黑河","绥化","鹤岗","伊春","大兴安岭","七台河市"],
        ["地区待确认","境外输入","吉林","长春","白山","白城","延边","松原","辽源","通化","四平"],
        ["地区待确认","境外输入","大连","沈阳","丹东","辽阳","葫芦岛","锦州","朝阳","营口","鞍山","抚顺","阜新","本溪","盘锦","铁岭"],
        ["地区待确认","境外输入","赤峰","包头","通辽","呼和浩特","乌海","鄂尔多斯","呼伦贝尔","兴安","巴彦淖尔","乌兰察布","锡林郭勒","阿拉善"],
        ["地区待确认","境外输入","朝阳","海淀","通州","房山","丰台","昌平","大兴","顺义","西城","延庆","石景山","宣武","怀柔","崇文",
            "密云","东城","门头沟","平谷"],
        ["地区待确认","境外输入","银川","吴忠","中卫","石嘴山","固原"],
        ["地区待确认","境外输入","太原","大同","运城","长治","晋城","忻州","临汾","吕梁","晋中","阳泉","朔州"],
        ["地区待确认","境外输入","石家庄","唐山","保定","邯郸","邢台","河北","沧州","秦皇岛","张家口","衡水","廊坊","承德"],
        ["地区待确认","境外输入","和平","北辰","河北","河西","西青","津南","东丽","武清","宝坻","红桥","大港","汉沽","静海","宁河","塘沽","蓟",
            "南开","河东"],
        ["地区待确认","境外输入","西宁",	"海西",	"海东地",	"海北",	"果洛",	"玉树",	"黄南藏族"],
        ["地区待确认","境外输入","兰州","天水","庆阳","武威","酒泉","张掖","陇南地","白银","定西地","平凉","嘉峪关","临夏回族","金昌","甘南"],
        ["地区待确认","境外输入","太原",	"大同",	"运城",	"长治",	"晋城",	"忻州",	"临汾",	"吕梁",	"晋中",	"阳泉",	"朔州"],
        ["地区待确认","境外输入","西安",	"咸阳",	"宝鸡",	"汉中",	"渭南",	"安康",	"榆林",	"商洛",	"延安",	"铜川"],
        ["地区待确认","境外输入","郑州",	"南阳",	"新乡",	"安阳",	"洛阳",	"信阳",	"平顶山",	"周口",	"商丘",	"开封",	"焦作",	"驻马店",	"濮阳",	"三门峡",	"漯河",	"许昌",	"鹤壁",	"济源"],
        ["地区待确认","境外输入","芜湖",	"合肥",	"六安",	"宿州",	"阜阳",	"安庆",	"马鞍山",	"蚌埠",	"淮北",	"淮南",	"宣城",	"黄山",	"铜陵",	"亳州",	"池州",	"巢湖",	"滁州"],
        ["地区待确认","境外输入","苏州",	"徐州",	"盐城",	"无锡",	"南京",	"南通",	"连云港",	"常州",	"扬州",	"镇江",	"淮安",	"泰州",	"宿迁"],
        ["地区待确认","境外输入","松江",	"宝山",	"金山",	"嘉定",	"南汇",	"青浦",	"浦东新",	"奉贤",	"闵行",	"徐汇",	"静安",	"黄浦",	"普陀",	"杨浦",	"虹口",	"闸北",	"长宁",	"崇明",	"卢湾"],
        ["地区待确认","境外输入","成都",	"绵阳",	"广元",	"达州",	"南充",	"德阳",	"广安",	"阿坝",	"巴中",	"遂宁",	"内江",	"凉山",	"攀枝花",	"乐山",	"自贡",	"泸州",	"雅安",	"宜宾",	"资阳",	"眉山",	"甘孜"],
        ["地区待确认","境外输入","武汉",	"宜昌",	"襄樊",	"荆州",	"恩施",	"孝感",	"黄冈",	"十堰",	"咸宁",	"黄石",	"仙桃",	"随州",	"天门",	"荆门",	"潜江",	"鄂州",	"神农架"],
        ["地区待确认","境外输入","温州",	"宁波",	"杭州",	"台州",	"嘉兴",	"金华",	"湖州",	"绍兴",	"舟山",	"丽水",	"衢州"],
        ["地区待确认","境外输入","江北",	"渝北",	"沙坪坝",	"九龙坡",	"万州",	"永川",	"南岸",	"酉阳",	"北碚",	"涪陵",	"秀山",	"巴南",	"渝中",	"石柱",	"忠",	"合川",	"大渡口",	"开",	"长寿",	"荣昌",	"云阳",	"梁平",	"潼南",	"江津",	"彭水",	"璧山",	"綦江",	"大足",	"黔江",	"巫溪",	"巫山",	"垫江",	"丰都",	"武隆",	"万盛",	"铜梁",	"南川",	"奉节",	"双桥",	"城口"],
        ["地区待确认","境外输入","长沙",	"邵阳",	"常德",	"衡阳",	"株洲",	"湘潭",	"永州",	"岳阳",	"怀化",	"郴州",	"娄底",	"益阳",	"张家界",	"湘西"],
        ["地区待确认","境外输入","南昌",	"赣州",	"上饶",	"吉安",	"九江",	"新余",	"抚州",	"宜春",	"景德镇",	"萍乡",	"鹰潭"],
        ["地区待确认","境外输入","贵阳",	"黔东南",	"黔南",	"遵义",	"黔西南",	"毕节",	"铜仁",	"安顺",	"六盘水"],
        ["地区待确认","境外输入","漳州",	"泉州",	"厦门",	"福州",	"莆田",	"宁德",	"三明",	"南平",	"龙岩"],
        ["地区待确认","境外输入","昆明",	"红河",	"大理",	"文山",	"德宏",	"曲靖",	"昭通",	"楚雄",	"保山",	"玉溪",	"丽江地",	"临沧地",	"思茅地",	"西双版纳",	"怒江",	"迪庆"],
        ["地区待确认","境外输入","台北",	"高雄",	"台中",	"新竹",	"基隆",	"台南",	"嘉义"],
        ["地区待确认","境外输入","贵港",	"玉林",	"北海",	"南宁",	"柳州",	"桂林",	"梧州",	"钦州",	"来宾",	"河池",	"百色",	"贺州",	"崇左",	"防城港"],
        ["地区待确认","境外输入","东莞",	"广州",	"中山",	"深圳",	"惠州",	"江门",	"珠海",	"汕头",	"佛山",	"湛江",	"河源",	"肇庆",	"潮州",	"清远",	"韶关",	"揭阳",	"阳江",	"云浮",	"茂名",	"梅州",	"汕尾"],
        ["地区待确认","境外输入","三亚",	"海口",	"琼海",	"文昌",	"东方",	"昌江",	"陵水",	"乐东",	"五指山",	"保亭",	"澄迈",	"万宁",	"儋州",	"临高",	"白沙",	"定安",	"琼中",	"屯昌"],
        ["地区待确认","境外输入","澳门"],
        ["地区待确认","境外输入","香港"]
    ];
var sel1 = document.getElementById("sel1");
var sel2 = document.getElementById("sel2");
sel1.onchange = function(){
    sel2.length = 1;
    console.log(this.selectedIndex);
    var index = this.selectedIndex;
    var a = city[index];
    for(var i = 0;i < a.length;i++){
        var option = new Option();
        option.value = a[i];
        option.innerHTML = a[i];
        console.log(a[i]);
        sel2.appendChild(option);
    }
}