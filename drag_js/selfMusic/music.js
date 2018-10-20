	
	let html = `<div id="miniplayer">
		<div id="self-audio">
			<div id="wrapper">
				<audio src="${msrc}"></audio>
			</div>
			<div id="time"></div>
			<div id="audio">
				<div id="play"></div>
				<div id="progress"></div>
				<div class="circle"></div>
			</div>
		</div>
		<div class="imgs">
			<div class="control">
				<div class="control-left">
					<i class="icon-backward"></i>					
					<i class="icon-play" id="togle"></i>					
					<i class="icon-forward"></i>					
				</div>
				<div class="control-right">
					<i class="icon-random"></i>
					<i class="icon-refresh"></i>
					<i class="icon-volume-off"></i>
				</div>
			</div>
		</div>
	</div>`;
	let body = document.querySelector("body");
	body.innerHTML = html;

	// let a = document.getElementsByTagName("audio")[0];
	// let time = document.querySelector("#time");
	// let alltime = a.duration;
	// 		let hour = Math.floor(alltime/60);
	// 		let minutes = Math.floor(a.duration%60);
	// 		let T = `${hour}:${minutes}`;
	// let p2 = document.createElement("span");
	// p2.innerHTML = '/'+T;
	// time.appendChild(p2);

let a = document.getElementsByTagName("audio")[0];
	let time = document.querySelector("#time");
	// let alltime = a.duration;
	// 		let hour = Math.floor(alltime/60);
	// 		let minutes = Math.floor(a.duration%60);
	// 		let T = `${hour}:${minutes}`;
	// let p2 = document.createElement("span");
	// p2.innerHTML = '/'+T;
	// time.appendChild(p2);
// console.log(alltime);
// let a = document.getElementsByTagName("audio")[0];
// let time = document.querySelector("#time");
let p = document.createElement("span");
let circle = document.querySelector(".circle");
let play = document.querySelector("#play");
let progress = document.querySelector("#progress");
let btn = document.querySelectorAll("button");
let togle = document.querySelector("#togle");
let random = document.querySelector(".icon-random");
let refresh = document.querySelector(".icon-refresh");
let volum = document.querySelector(".icon-volume-off");

togle.onclick = function(){
		// if(this.classList)
		console.log(this.classList);
		if(this.classList[0] === "icon-play"){
				a.play();
		}else{
			a.pause();
		}
}

// 功能按钮
random.style.color = "white";
refresh.style.color = "white";
volum.style.color = "white";
random.onclick = function(){
	if(this.style.color === "white"){
		this.style.color = "#d61c1c99";
	}else{
		this.style.color = "white";

	}
}
refresh.onclick = function(){
	if(this.style.color === "white"){
		this.style.color = "#d61c1c99";
	}else{
		this.style.color = "white";

	}
}
volum.onclick = function(){
	if(this.style.color === "white"){
		this.style.color = "#d61c1c99";
	}else{
		this.style.color = "white";

	}
}


p.innerHTML = '0:00';
time.appendChild(p);
// time.appendChild(p2);
// alert(typeof getStyle(progress,"width"));

a.addEventListener("pause",() => {
	togle.classList.add("icon-play");
	togle.classList.remove("icon-pause");
},true);
a.addEventListener("play",() => {
	console.log("play");
	togle.classList.remove("icon-play");
	togle.classList.add("icon-pause");

},true);
//监听audio的当前时间
let pre = 0;
a.addEventListener("timeupdate",(evt) => {
	let all = Math.floor(evt.target.duration);
	let speed = Math.floor(evt.target.currentTime);	
	// console.log(all);
	let dis = getStyle(progress,"width")/all;
	++pre;
	if(pre % 4 == 0){
		circle.style.left = (speed*dis) + "px";
		play.style.width = (speed*dis) + "px";
	}

	p.innerHTML = formatTime(evt,2);
	// p2.innerHTML = formatTime(evt,1);
	// silder(speed);

},true);
//监听play事件
a.addEventListener("play",() => {
	// playMusic();
},true)



// id == 2 当前时间 id == 1 总时间
function formatTime(evt,id){ 
	if(id === 2){ //current time
			let curt = Math.floor(evt.target.currentTime);
			// console.log(currentt);
			let current =curt;
			let hour = Math.floor(curt/60);
			// console.log('0'+curt)
			if(current%60 === 0){
				current = '00';
			}else{
				curt%60 < 10?current = `0${curt%60}`:current = curt%60;
			}
			return `${hour}:${current}`;
	}
	else if(id ===1){ //alltime
			let alltime = evt.target.duration;
			let hour = Math.floor(alltime/60);
			let minutes = Math.floor(evt.target.duration%60);
			return `${hour}:${minutes}`;
	}
}

// 170s 224px


silder();
//滑动
function silder(){	
		let alldis = getStyle(progress,"width");

		circle.addEventListener("touchmove",(e) => {
		let left = e.path[1].offsetLeft; // 当前滑块到x轴的距离
		let dis = e.touches[0].clientX - left;
		if(dis < alldis&& dis >= 0){
			// console.log(dis);
			circle.style.left = (dis) + "px";
			play.style.width = dis + "px";
			// console.log(dis/alldis*a.duration);
			a.currentTime = dis/alldis * a.duration;
			console.log(dis/alldis * a.duration+5);
		}
		// console.log('clientX:'+e.touches[0].clientX);
		// console.log('pageX:'+e.touches[0].pageX);
		},true);
	//pc端 silder的拖动
		document.onmousedown = function(e){
			let x = e.pageX - circle.offsetLeft;
			document.onmousemove = function(e){
				if(e.pageX - x < alldis && e.pageX - x >= 0){
				 circle.style.left = e.pageX - x + "px";
				 play.style.width = e.pageX - x + "px";
				 // console.log(e.pageX - x)
				 a.currentTime = (e.pageX - x)/alldis * a.duration;
				}
			}
		}
		document.onmouseup = function(e){
			document.onmousemove = null;
		}	
}
//计算css属性,并以number类型输出
function getStyle(element, attr) {
		let pattern = /([\-\+]?\d*\.\d*)|((\d*))/;
        if(element.currentStyle) {
                return parseFloat(element.currentStyle[attr].match(pattern)[0]);
        } else {
                return parseFloat(getComputedStyle(element, false)[attr].match(pattern)[0]);
        }
}

function getall(){
	let p2 = document.createElement("span");
	a.load();
	a.oncanplay = function(){
			let alltime = a.duration;
			let hour = Math.floor(alltime/60);
			let minutes = Math.floor(a.duration%60);
			let T = `${hour}:${minutes}`;
			p2.innerHTML = '/'+T;
	}
			time.appendChild(p2);		
}
getall(); 