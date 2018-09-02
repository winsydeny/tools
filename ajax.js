/*
    get 请求
    url为对象
    data 发送数据
    success 和 fail 均为回调函数，它们在服务器返回数据的时候才执行


    post 请求
    post 传递参数必须在send 函数当中去传递给服务器
    并且必须设置头部信息




    使用实例:    
ajax({
        method:"get",
        url:"test.php",
        data:{
            username:"test",
            password:123456789,
        },
        success:function(res){
            成功返回
        },
        fail:function(err){
            失败返回
        }
});
*/
function ajax(obj){
    // toUrl(obj);
    if(window.XMLHttpRequest){
        let xhr = new XMLHttpRequest();
        let allurl,methods;
        if(obj.method === "POST"||obj.method === "post"){
            methods = "POST";
            allurl = obj.url;
        }else if(obj.method === "GET"||obj.method ==="get"){
            methods = "GET";
            !obj.data?allurl = obj.url:allurl = toUrl(obj)
        }else{
            alert("请求参数错误");
        }
        // console.log(allurl);
        xhr.open(methods,allurl,true);
        xhr.onreadystatechange = function(res){
            if(this.readyState === 4){
                if(this.status >= 200&& this.status < 300){
                    obj.success(res.target);
                    }else{
                        obj.fail(res.target.status);
                    }
                }
            }
        
        if(obj.method === "POST"||obj.method === "post"){
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send("user="+obj.data.user+"&"+"pwd="+obj.data.pwd);
        }else{
            xhr.send(null);    
        }

    }else{
        alert("当前浏览器不支持此功能，请更换浏览器");
    }

}
function toUrl(obj){
    let arr = [];
    for(let item in obj.data)
        {   
            arr.push(item+"="+encodeURIComponent(obj.data[item]));
        }
    // console.log(obj.data);
    return obj.url +"?"+arr.join("&");
}