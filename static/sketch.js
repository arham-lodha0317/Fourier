
//
// //DOM elements
// let fileinput;
// let submitButton;
// let maxAbsoluteFrequencySlider;
// let maxFP;
// let totalTimeSlider;
// let totalTimeP;
// let img;
//
// //SVG PATH
// let path;
//
//
// //important variables
// let maxAbsoluteFrequency;
// let totalTime;
// let sampledPoints;
//
//
// let cycles;
//
// function setup() {
//
// 	STATE = USER;
// 	setupPage();
//
// 	canvas = createCanvas(window.innerWidth*.90, window.innerHeight*.90);
// 	canvas.parent("sketch")
// 	background(0)
//
// }
//
// function draw() {
//
// 	background(0);
//
//
// 	if(STATE === USER){
// 		maxAbsoluteFrequency = maxAbsoluteFrequencySlider.value();
// 		maxFP.html(maxAbsoluteFrequency)
//
// 		totalTime = totalTimeSlider.value();
// 		totalTimeP.html(totalTime);
// 	}
// 	else{
// 		cycles.display();
// 	}
//
// }
//
// function retrievePath(file) {
//   if (file.subtype === "svg+xml") {
//
// 	var reader = new FileReader();
// 	reader.onload = function (e) {
// 		document.getElementById("svg").innerHTML=e.target.result
// 		path = $("#svg path")[0]
// 	};
//
// 	reader.readAsText(file.file)
// 	select("#svg").hide()
//   }
//   else img = null
//
//
// }
//
// function setupPage(){
// 	fileinput = createFileInput(retrievePath);
// 	fileinput.addClass("col-sm-4")
// 	fileinput.parent("row1")
//
// 	fourierDetails = createDiv("");
// 	fourierDetails.addClass("col-sm-8").addClass("row");
// 	fourierDetails.parent("row1");
//
// 	angularV = createDiv("").addClass("row").parent(fourierDetails);
// 	createP("Maximum Frequency").addClass("col").parent(angularV)
// 	maxAbsoluteFrequencySlider = createSlider(0,100, 50, 1).addClass("col").parent(angularV);
// 	maxFP = createP("").addClass("col").parent(angularV);
//
// 	totalTimeDiv = createDiv("").addClass("row").parent(fourierDetails);
// 	createP("Total Time").addClass("col").parent(totalTimeDiv);
// 	totalTimeSlider = createSlider(0,60, 10, 1).addClass("col").parent(totalTimeDiv);
// 	totalTimeP = createP("").addClass("col").parent(totalTimeDiv);
//
//
// 	submitButton = createButton("Start the Fourier Series");
// 	submitButton.parent("row2");
// 	submitButton.mousePressed(submit);
// }
//
// function submit() {
// 	if (STATE === USER) {
// 		var min = width < height ? "x" : "y";
//
// 		let json = {
// 			"svgpath": path.getAttribute("d"),
// 			"steps": 1000,
// 			"size": Math.min(width*.85, height*.85),
// 			"min" : min
// 		}
// 		p.httpPost("/svg", json, result => {
// 			sampledPoints = JSON.parse(result);
// 			console.log(sampledPoints);
//
// 			cycles = new FourierEpicycles(sampledPoints, maxAbsoluteFrequency);
// 			cycles.display(p);
//
//
// 			STATE = FOURIER;
// 		})
//
//
// 	}
// }




