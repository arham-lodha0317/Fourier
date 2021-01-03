let complexFourier = (p) => {
    const USER = 0;
    const FOURIER = 1;
    const PATH = 2;
    let STATE;

    let canvas;
    let width;
    let height;

    //DOM elements
    let fileinput;
    let submitButton;

    let timeFactor;
    let timeSlider;
    let timeText;

    let maxFrequency;
    let maxFreqSlider;
    let maxFText;

    //svg processing
    let img;
    let svg_path;

    let signal;
    let fourier;
    let path;

    p.setup = () => {
        canvas = p.createCanvas(window.innerWidth * .75, window.innerHeight * .90);
        canvas.parent('sketch');
        width = p.width;
        height = p.height;

        STATE = USER;
        setupPage();

    }

    p.draw = () => {
        p.background(0)

        p.background(0);
        p.translate(width/2, height/2);
        p.scale(1,-1)

        timeFactor = timeSlider.value();
        timeText.value(timeFactor);

        maxFrequency = maxFreqSlider.value();
        maxFText.value(maxFrequency);

        if(STATE === USER){}
        else if(STATE === FOURIER){
            fourier.changeTimeMultiplier(timeFactor);
            if(fourier.maxFrequency !== maxFrequency){
                fourier.recompute(maxFrequency);
                path = []
            }
            drawComplexPath();
        }
    }

    function retrievePath(file) {
        if (file.subtype === "svg+xml") {

            console.log(file);

            // let reader = new FileReader();
            // reader.onload = function (e) {
            //     document.getElementById("svg").innerHTML=e.target.result;
            //     svg_path = "";
            //     let num = $("svg path").length
            //     for (let i = 0; i < num; i++) {
            //         svg_path += $("svg path")[i].getAttribute("d").trim();
            //     }
            //
            // };
            //
            // reader.readAsText(file.file)
            // p.select("#svg").hide()
        }
        else img = null

    }

    function setupPage(){

        fileinput= p.createFileInput(retrievePath);
        fileinput.parent("file-upload");

        maxFreqSlider = p.createSlider(0,100,50, 1).parent("MaxFrequencySlider");
        maxFText = p.createInput('').parent("MaxFrequencyText");
        maxFrequency = maxFreqSlider.value();

        timeSlider = p.createSlider(.1, 10, 1, .1)
        timeText = p.createInput('').parent("TimeText");
        timeSlider.parent("TimeSlider");
        timeFactor = timeSlider.value();

        let start = p.createButton("Start Fourier").parent("submit");
        start.mousePressed(submit);

    }

    function submit() {
        if (STATE === USER) {
            // let min = width < height ? "x" : "y";
            //
            // let json = {
            //     "svgpath": svg_path,
            //     "steps": 1000,
            //     "size": Math.min(width*.85, height*.85),
            //     "min" : min
            // }
            // p.httpPost("/svg", json, result => {
            //     signal = JSON.parse(result);
            //     path = [];
            //     fourier = new FourierEpicycles(signal, maxFrequency,0,0);
            //     drawPath();
            //
            //     STATE = FOURIER;
            // })
        }
    }

    drawComplexPath = () => {
        let end = fourier.display(p);
        path.unshift(end);

        p.stroke(0,255,0);
        total = fourier.getTotalTime();

        p.noFill();
        p.beginShape();
        for (let i = 0; i < path.length; i++) {
            p.vertex(path[i].x, path[i].y);
        }
        p.endShape();

        if(path.length === total){
            path.pop();
        }
    }
}

let complexFourierSketch = new p5(complexFourier, 'complexFourierSketch');
