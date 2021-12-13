//首先需要禁止form表单的action自动提交
$("#confirm_form").submit(function(e){
	    e.preventDefault();

        var sel_pro = document.getElementsByName("sel_province")[0].value;
        var sel_city = document.getElementsByName("sel_city")[0].value;
        var add_nums = document.getElementsByName("addNumber")[0].value;
        var add_id = document.getElementsByName("password")[0].value;
        var data= {
            data: JSON.stringify({
                'province': sel_pro,
                'city': sel_city,
                'confirm_add': add_nums,
                'password': add_id
            }),
        }

        $.ajax({
            url:"/add_operate",
            type:'POST',
            data: data,   // 这个序列化传递很重要
            dataType: 'json',
            success:function (resp) {
                //alert("confirm_add:"+resp['confirm_add']+";result:"+resp['result'])
                if(resp['flag'] == 1){
                    alert('更新成功！');
                }else if(resp['flag'] == 2){
                    alert('请检查省份/城市/新增数目/身份码是否留空或者填写错误！')
                }else if(resp['flag'] == 3){
                    alert('更新失败！您没有该权限！')
                }else{
                    alert("更新失败！")
                }
            },
            error: function (){
                alert("error!")
            }
        })
});
