var nav = document.getElementById('nav');
var navBtns = nav.getElementsByTagName('span');
var contentBox = document.getElementById('contentBox');

for (var i = 0; i < navBtns.length; i++) {
	(function(i){
		navBtns[i].onclick = function(){
			console.log(1)
			for (var j = 0; j < contentBox.children.length; j++) {
				//removeClass(contentBox.children[j],'show');
				//addClass(contentBox.children[j],'hide');
			}
			for (var q = 0; q < navBtns.length; q++) {
				removeClass(navBtns[q],'active');
			}
			//addClass(contentBox.children[i],'show');
			addClass(this,'active');
		}
	})(i)
}

function removeClass(obj,sClass){
	var arr = obj.className.split(' ');
	var res = findOne(arr,sClass); 
	if(res){
		for(var i = 0; i<res.length; i++){
			arr.splice(res[i],1)
		}
	}
	obj.className = arr.join(' ');
}
function addClass(obj,sClass){
	var arr = obj.className.split(' ');
	var res = findOne(arr,sClass);
	if(!res){
		arr.push(sClass)
		obj.className = arr.join(' ');
	}
}
function findOne(arr,one){
	var res = [];
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == one){
			res.push(i);
		}
	}
	if(res.length){
		return res;
	}
	return false;
}
