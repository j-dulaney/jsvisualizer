'use strict';
// Todo
// Reverse mode (bars on top upside down)
// Multiple audio files (dear god please)
// UI overhaul
const
canvas = document.querySelector('canvas');
const
ctx = canvas.getContext('2d');
const
audioCtx = new AudioContext();
const
analyser = audioCtx.createAnalyser();
const
myAudio = document.querySelector('audio');
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var drawColor = '#ff0000';
var backColor = "#000";
var drawCtrl = false;
var len;
var amp;
var colorArray = [ "#ff0000", "#008000", "#0000FF", "#FFFF00", "#ffffff",
		"#000000", ];
var bcolorArray = [ "#000000", "#FFFF00", "#0000FF", "#008000", "#ff0000",
		"#ffffff" ];

function draw() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var dataArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(dataArray);
	ctx.fillStyle = backColor;
	// Change backColor to whatever for background color change
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = drawColor;
	// Change drawColor to whatver for bar color cahnge
	len = len;
	var width = canvas.width / len;
	// Change 256 to whatever for bar change
	for (var i = 0; i < len; i++) {
		var x = width * i;
		var height = dataArray[i] * amp;
		ctx.fillRect(x, canvas.height - height, width, height);
	}
	// These if statements are to increase the bar count
	if (barCnt == 0) {
		len = 1024;
	}
	if (barCnt == 1) {
		len = 512;
	}
	if (barCnt == 2) {
		len = 256;
	}
	if (barCnt == 3) {
		len = 128;
	}
	if (barCnt == 4) {
		len = 64;
	}
	if (barCnt == 5) {
		len = 32;
	}
	if (barCnt == 6) {
		barCnt = 0;
	}
	// These are for color toggling foreground (bar) colors
	if (eCount == 0) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 1) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 2) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 3) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 4) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 5) {
		drawColor = colorArray[eCount];
	}
	if (eCount == 6) {
		eCount = 0;
	}
	// These are for color toggling background colors
	if (rCount == 0) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 1) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 2) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 3) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 4) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 5) {
		backColor = bcolorArray[rCount];
	}
	if (rCount == 6) {
		rCount = 0;
	}
	//Checks for amp values
	if(aCount==0){
		amp=.5;
	}
	if(aCount==1){
		amp=1;
	}
	if(aCount==2){
		amp=2;
	}
	if(aCount==3){
		amp=5;
	}
	if(aCount==4){
		aCount=0;
	}
	//Resets to default
	if(jCount!=0){
		eCount=0;
		aCount=3;
		//3 is more definable to look at, defaults to amp mod 5
		rCount=0;
		jCount=0;
		barCnt=0;
	}
	//Pause function
	if(sCount==0){
		myAudio.play();
	}
	if(sCount==1){
		myAudio.pause();
	}
	if(sCount==2){
		sCount=0;
	}
		ctx.font = "15px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Press 'c' for controls", canvas.width/2, 30);
		ctx.fillText("Song: Ultralounge (incompetech.com)", canvas.width-250, 30);
	// If controls are enabled, draw them
	if (drawCtrl) {
		drawControls();
	}
	function drawControls() {
		ctx.font = "12px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("CONTROLS", 0, 10);
		ctx.fillText("Q                  Change Bar Color ", 0, 20);
		ctx.fillText("E                  Change Background Color ", 0, 30);
		ctx.fillText("W                  Cycle bar count", 0, 40);
		ctx.fillText("A                  Change amplification of bars", 0, 50);
		ctx.fillText("R                  Reset to defaults", 0, 60);
		ctx.fillText("Spacebar   Pause/Play", 0, 70);
		ctx.fillText("Current Color:  " + convertColor(drawColor), 0, 80);
		ctx.fillText("Current Color:  " + convertColor(backColor), 0, 90);
		ctx.fillText("Current bar amount:  " + len, 0, 100);
		ctx.fillText("Current amp mod: "+amp, 0, 110)
	}
	function convertColor(color){
		[ "#ff0000", "#008000", "#0000FF", "#FFFF00", "#ffffff",
		"#000000", ];
		if(color=="#ff0000"){
			return "Red";
		}
		else if(color=="#008000"){
			return "Green";
		}		
		else if(color=="#FFFF00"){
			return "Yellow";
		}		
		else if(color=="#0000FF"){
			return "Blue";
		}
		else if(color=="#ffffff"){
			return "White";
		}
		else if(color=="#000000"){
			return "Black";
		}
	}
	
	
	window.requestAnimationFrame(draw);
}

function main() {
	var source = audioCtx.createMediaElementSource(myAudio);
	var frameCount = audioCtx.sampleRate * 2.0;
	var myArrayBuffer = audioCtx.createBuffer(2, frameCount, 41000);
	window.addEventListener('keydown', checkKey, false);
	source.buffer = myArrayBuffer;
	source.connect(analyser);
	analyser.connect(audioCtx.destination);
	draw();
}
var barCnt = 0;
var eCount = 0;
var aCount= 3;
var rCount = 0;
var jCount=0;
var sCount=0;
var interval=200;
//hidden randomized mode
function randomize(){
	interval=Math.floor((Math.random()*500)+100);
	drawColor=colorArray[Math.floor((Math.random()*5)+1)];
	backColor=bcolorArray[Math.floor((Math.random()*5)+1)];
}

function checkKey(e) {
	console.log(e.keyCode);
	if (e.keyCode == 67) {
		e.preventDefault();
		drawCtrl = !drawCtrl;
	}
	if (e.keyCode == 87) {
		barCnt++;
	}
	if (e.keyCode == 81) {
	//Bar color
		eCount++;
	}
	if (e.keyCode == 69) {
	//Back Color
		rCount++;
	}
	if(e.keyCode==65){
		aCount++;
	}
	if(e.keyCode==82){
	//Default
		jCount++;
	}
	if(e.keyCode==32){
		e.preventDefault();
		sCount++;
	}
	if(e.keyCode==74){
		setInterval(randomize, interval);
	}
}