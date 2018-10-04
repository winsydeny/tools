function Pagination(total,cur=1,around=2){
    this.total = total;
    this.cur = cur;
    this.around = around;
    this.gener = function(){
         generatePages(this.total,this.cur,this.around);
    }
}
let page = 1;
const makeResult = (total,cur,around) => {
    //重点在于什么时候开始出现省略号
let result = [];
let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
let startPosition = 1 + 2 + around,endPosition = total - 2 - around;
// console.log('startPostion='+startPosition,'endPostion='+endPosition);
if(total <= baseCount - 2){ //全部显示 不出现省略号
    result =  Array.from({length: total}, (v, i) => i + 1);
}else{ //需要出现省略号
    if(cur <= startPosition){ //1.只有后面出现省略号
        result = [...Array.from({length: surplus}, (v, i) => i + 1),"...",total]
    }else if(cur >= endPosition) { //2.只有前边出现省略号
        result = [1,'...',...Array.from({length: surplus}, (v, i) => total - surplus + i + 1)]
    }else{ //3.两边都有省略号
        result = [1,'...',...Array.from({length: around * 2 + 1}, (v, i) => cur - around + i),'...',total]
    }
}

return result
}
function generatePages(t,c,a){  
    let wrapper = document.querySelector("#wrapper");
    //创建ul
    let ul = document.createElement("ul");
    ul.setAttribute("class","ullist");
    let len = Math.floor(makeResult(t,c,a).length/2);
    let arr = makeResult(t,c,a);
    // 创造上一页
    let list1 = document.createElement("li");
    list1.setAttribute("class","prelist");
    list1.textContent = "上一页";
    ul.appendChild(list1);
    //创建页码
    for(let i= 0;i<arr.length;i++){
        let li = document.createElement("li");
        li.setAttribute("class","list");
        li.textContent = arr[i];
        ul.appendChild(li);
    }
    //创建下一页
    let list2 = document.createElement("li");
    list2.setAttribute("class","aftlist");
    list2.textContent = "下一页";
    ul.appendChild(list2);
    //添加进类为wrapper的div中
    wrapper.appendChild(ul);
    let ullist = document.querySelector(".ullist").children; 
    for(let i = 0;i<ullist.length;i++){
        if(ullist[i].textContent == c){
            // 改变颜色
            ullist[i].style.color = "green";
            ullist[i].style.background = "#00BCD4";
        }
        else if(ullist[i].textContent === "..."){
            // ullist[i].setAttribute("class","ellipsis")
            ullist[i].style.color = "red";
            ullist[i].style.background = "none";
            ullist[i].style.cursor = "auto";
        }
    }
    getPageNum(ul,t,c,a);
    getIndex(page);
}
function getPageNum(list,t,c,a){
    list.addEventListener("click",(evt) => {
        list.remove();
        let tg = evt.target;
        if(tg.className === "aftlist"){
            page<t?generatePages(t,++page,a):generatePages(t,t,a);
        }else if(tg.className === "prelist"){
            page>1?generatePages(t,--page,a):generatePages(t,1,a);
        }else if(tg.className === "list"){
            // console.log(tg.textContent);
            if(tg.textContent != "..."){
                page = tg.innerText;
                generatePages(t,tg.innerText,a);
            }
            else{
                generatePages(t,c,a);
            }
        }
    })
}
function getIndex(index){
    // ajax 
    // console.log(index);
}
// generatePages(20,page,2);
