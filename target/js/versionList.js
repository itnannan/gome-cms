var anchor = window.location.href.split("#")[1];
var verUl = document.querySelectorAll('.ver-ul');
if(/ios/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('ios'),"selected")
}else if(/android/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('android'),"selected")
}else if(/mac/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('mac'),"selected")
}else if(/windows/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('windows'),"selected")
}
function removeClass(ele, sClass){
	var classArr = ele.className.split(' ');
	for(var i = 0; i < classArr.length; i++){
		if(classArr[i] == sClass){
			classArr.splice(i--,1);
		}
	}
	ele.className = classArr.join(' '); 
}

function addClass (ele, sClass){
	var classArr = ele.className.split(' ');
	for (var i = 0; i < classArr.length; i++) {
		if(classArr[i] == sClass){
			return;
		}
	}
	ele.className += (" "+sClass);
}