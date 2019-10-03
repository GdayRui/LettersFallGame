$(document).ready(function(){
	$(document).click(dropLetters);
	$(document).keydown(onKeyPress);
	
	$(window).resize(function(){
		clearInterval(itv);
		isResized = true;
		
		$('.canvas').text('Please reload the page.');
		$('.canvas').addClass('show-info');		
	});
});

var settings = {
	letterArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	colorArray: ['lightpink','lightgreen','lightgray','plum', 'lightsalmon','lightskyblue'],
	interval: 1000,			// after every such interval, a new letter is generated on screen
	minTravelTime: 1000,
	travelTimeDiff: 7000,	// the difference between min travel time and max travel time
	minFontSize: 30,
	fontSizeDiff: 200		// the difference between min font size and max font size
}

var isStarted = false;
var isResized = false;
var itv;
var id=0;

var maxHeight = (window.innerHeight-120).toString() +'px';
var maxWidth = window.innerWidth - 100;

function dropLetters(){
	if(isResized){
		return;  
	}
	
	var currColor = settings.colorArray[Math.floor(Math.random() * settings.colorArray.length)];
	
	if(!isStarted){
		$('#introduction').hide();
		$('#setting').hide();
		$('#scoreNum').show();

		itv = setInterval(function(){
			var currLetterIdx = Math.floor(Math.random()*settings.letterArray.length);
			var currLetter = settings.letterArray[currLetterIdx];
			
			var currLeft = Math.floor(Math.random() * settings.fontSizeDiff) + settings.minFontSize;
			var opacity = Math.random();
			
			var fontSize = Math.floor(Math.random()* settings.fontSizeDiff) + settings.minFontSize;
			
			var elemHtml = '<div id="letter_'+id+'" style="left:'+ currLeft +'px; opacity:'+opacity+'; font-size:'+fontSize+'px;color:'+currColor+'" class="letterDiv">'+currLetter+'</div>'
			$('.canvas').append(elemHtml);
			
			var randSpeed = Math.floor(Math.random() * settings.travelTimeDiff) + settings.minTravelTime;
			
			var newElem = $('#letter_'+id);
			
			newElem.animate({top:maxHeight},randSpeed,'linear', 
			function(){
				newElem.remove();
			});	
			
			id++;
		}, settings.interval );
	}
	else{
		clearInterval(itv);
	}
	isStarted = !isStarted;
}

function _onKeyPress(e){
	if(e.key){
		var upper = $('.canvas div:contains("'+e.key.toUpperCase()+'")');
		var lower = $('.canvas div:contains("'+e.key.toLowerCase()+'")');
		
		upper.hide( "explode", {pieces: 16 }, 200 );
		lower.hide( "explode", {pieces: 16 }, 200 );

	}
}
var scoreNum = 0;
function onKeyPress(e){
	if(e.which==32){
		dropLetters();
	}
	if(e.key){
		
		var upper = $('.canvas div:contains("'+e.key.toUpperCase()+'")');
		var lower = $('.canvas div:contains("'+e.key.toLowerCase()+'")');
		
		upper.stop();
		lower.stop();
		
		var styleObj = {
			opacity:0,
			left:'-=30px',
			top:'-=80px',
			fontSize:'200px'
		};
		var t = 100;
		
		upper.animate(styleObj, t, "linear", function(){
			upper.remove();
		})
		
		lower.animate(styleObj, t, "linear", function(){
			lower.remove();
		})

		
		scoreNum = scoreNum + upper.length + lower.length;
		$("#scoreNum").text(scoreNum);
	}
}


