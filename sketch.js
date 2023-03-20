//circle size growth
let minSize = 17
let maxSize = 200

//welcome prompt - visible initial fill
let value = 0;


// random walker
var pointX = [];
var pointY = [];
var speedX = [];
var speedY = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(hex);


  for (var i = 0; i < 7; i = i + 1) {
    pointX[i] = random(0, width);
    pointY[i] = random(0, height);
    speedX[i] = random(-5, 5);
    speedY[i] = random(-5, 5);
  }

//audio input
mic = new p5.AudioIn();
mic.start();

fft = new p5.FFT();
fft.setInput(mic);
}

function draw() {

// background(0, 0, 0, 20); 
 
if (frameCount%5 == 0){
	background(255, 255, 255, 100);
}

for (var i = 0; i < 7; i = i + 1) {
    pointX[i] = pointX[i] + speedX[i];
    pointY[i] = pointY[i] + speedY[i];

    if (pointX[i] > width || pointX[i] < 0) {
      speedX[i] = -speedX[i];
    }
    
    if (pointY[i] > height || pointY[i] < 0) {
      speedY[i] = -speedY[i];
    }
  }
	//spectrum divided into 7 sections
	let spectrum = fft.analyze();
	let circleOne = fft.getEnergy(300, 600);
	let circleTwo = fft.getEnergy(600, 900);
	let circleThree = fft.getEnergy(900, 1200);
	let circleFour = fft.getEnergy(1200, 1500);
	let circleFive = fft.getEnergy(1500, 1800);
	let circleSix = fft.getEnergy(1800, 2100);
	let circleSeven = fft.getEnergy(2100, 2500);

	// circle sizes
	let sizeOne = map(circleOne, 0, 255, minSize, maxSize);
	let sizeTwo = map(circleTwo, 0, 255, minSize, maxSize);
	let sizeThree = map(circleThree, 0, 255, minSize, maxSize);
	let sizeFour = map(circleFour, 0, 255, minSize, maxSize);
	let sizeFive = map(circleFive, 0, 255, minSize, maxSize);
	let sizeSix = map(circleSix, 0, 255, minSize, maxSize);
	let sizeSeven = map(circleSeven, 0, 255, minSize, maxSize);

	//center position circles
	translate(width / 2, height / 2);

	//color with transparency
	//noFill();
	stroke('#0060ff');
	fill('#0060ff');
	// noStroke();

	drawingContext.shadowBlur = 32; 
	drawingContext.shadowColor = color(255, 255, 255, 100);


	//circles starts from the center from circle 1 then outwards to circle 7

	//circle 1 = 1 circle
	circle(pointX[0], pointY[1], sizeOne);

	//circle 2 = 6 circles
	for (let i = 0; i < 6; i++) {
		circle(pointX[1], pointY[2], sizeTwo);
		rotate(PI / 3);
	}

	//circle 3 = 12 circles
	for (let i = 0; i < 12; i++) {
		circle(pointX[2], pointY[3], sizeThree);
		rotate(PI / 6);
	}

	//circle 4 = 20 circles
	for (let i = 0; i < 20; i++) {
		circle(pointX[3], pointY[4], sizeFour);
		rotate(PI / 10);
	}

	//circle 5 = 24 circles
	for (let i = 0; i < 24; i++) {
		circle(pointX[4], pointY[5], sizeFive);
		rotate(PI / 12);
	}

	//circle 6 = 32 circles
	for (let i = 0; i < 32; i++) {
		circle(pointX[5], pointY[6], sizeSix);
		rotate(PI / 16);
	}

	//circle 7 = 36 circles
	for (let i = 0; i < 36; i++) {
		circle(pointX[6], pointY[7], sizeSeven);
		rotate(PI / 18);
	}
}


function mousePressed() {
	//changes welcome prompt color to hide text
	if (value === 0) {
		value = 240;
		//starts audio input	
		getAudioContext().resume();
	}
}