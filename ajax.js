/*
    get 请求
    url为对象，里面有三个基本的属性,url ,user , pwd,
    success 和 fail 均为回调函数，它们在服务器返回数据的时候才执行


    post 请求
    post 传递参数必须在send 函数当中去传递给服务器
    并且必须设置头部信息




    使用实例:    
        ajax({
            method:"GET",
            url:"test.php",
            user:"test",
            pwd:11
        },function(data){
            // console.log(data.responseText);
            alert(data.responseText);
        },function(fail){
            console.log(fail.status);
        })
*/
function ajax(obj,success,fail){
    if(window.XMLHttpRequest){
        let xhr = new XMLHttpRequest();
        let allurl,methods;
        if(obj.method == "POST"){
            methods = "POST";
            allurl = obj.url;
        }else{
            methods = "GET";
            !obj.user?allurl = obj.url:allurl = totalUrl(obj);
        }
        xhr.open(methods,allurl,true);
        xhr.onreadystatechange = function(res){
            if(this.readyState == 4){
                if(this.status >= 200&& this.status < 300){
                    // console.log(this.status);
                    success(res.target);
                }else{
                    fail(res.target);
                }   
            }
        }
        if(obj.method == "POST"){
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send("user="+obj.user+"&"+"pwd="+obj.pwd);
        }else{
            xhr.send(null);    
        }

    }else{
        alert("当前浏览器不支持此功能，请更换浏览器");
    }

}
function totalUrl(obj){
    return obj.url+"?user"+"="+encodeURIComponent(obj.user)+"&pwd"+"="+encodeURIComponent(obj.pwd);
}
