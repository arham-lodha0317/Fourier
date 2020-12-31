let wave = (p) => {

    let STATE;
    const FOURIER = 1;
    const USER = 0;

    let canvas;
    let width;
    let height;

    let signal;
    let fourier;
    let path;
    let start;

    let timeFactor;
    let timeSlider;
    let timeText;

    let maxAngularVelocity;
    let maxARSlider;
    let maxARText;

    p.setup = () => {
        canvas = p.createCanvas(window.innerWidth * .75, window.innerHeight * .90);


        canvas.parent('waveSketch');
        width = p.width;
        height = p.height/2;

        STATE = 0;


        signal = [];
        for (let i = 0; i < width/4; i++) {
            signal.push([0])
        }

        start = p.createButton("Start Fourier").parent("waveSubmit");
        start.mousePressed(buttonPress);


        maxARSlider = p.createSlider(0, 100, 10, 1).parent("waveMaxFrequencySlider");
        maxAngularVelocity = maxARSlider.value;

        maxARText = p.createInput('').parent("waveMaxFrequencyText");

        timeSlider = p.createSlider(.1, 10, 1, .1);
        timeSlider.parent("waveTimeSlider");

        timeFactor = timeSlider.value();

        if(timeFactor < 0) timeFactor = 1 / Math.abs(timeFactor);

        timeText = p.createInput('').parent("waveTimeText");
    }

    p.draw = () => {

        p.background(0);
        p.translate(0, height);
        p.scale(1,-1)

        timeFactor = timeSlider.value();

        timeText.value(timeFactor);

        maxAngularVelocity = maxARSlider.value();
        maxARText.value(maxAngularVelocity);

        if(STATE === USER){

            if(p.mouseIsPressed){
                mousePressed();
            }

            p.stroke(255);

            p.noFill();

            p.beginShape();

            for (let i = 0; i < width/2; i++) {
                p.vertex(i + width/2, signal[i%(width/4)][0]);

            }
            p.endShape();
        }
        else{
            fourier.changeTimeMultiplier(timeFactor);
            if(fourier.maxFrequency !== maxAngularVelocity) fourier.recompute(maxAngularVelocity);
            drawPath();
        }
    }

    mousePressed = () => {
        if(p.mouseX > width/2 && p.mouseY >0 && p.mouseY < height*2) {
            let x = Math.round((p.mouseX - width / 2 - 1) % (width / 4));
            let y = p.mouseY - height;

            let dy;

            if (y < 0) {

                dy = 2;

            } else dy = -2;

            let counter = 1;

            for (let i = -5; i <= 5; i++) {
                if(x+i >= signal.length) break;
                if(x+i < 0) continue;
                signal[x+i][0]+= Math.abs(signal[x+1] ) === height ? 0 : counter*dy;
                if (i <= 0) counter++;
                else counter--;
            }
        }
    }

    drawPath = () => {
        let end = fourier.display(p);
        path.unshift(end.y);

        p.stroke(0,255,0);


        let startX = width/2;
        let total = width - startX;

        p.line(end.x, end.y, startX, end.y);

        p.noFill();
        p.beginShape();
        for (let i = 0; i < path.length; i++) {
            p.vertex(startX + i, path[i]);
        }
        p.endShape();

        if(path.length === total){
            path.pop();
        }
    }

    buttonPress = () => {
        if(STATE === USER){
            STATE = FOURIER;
            fourier = new FourierEpicycles(signal, maxAngularVelocity, width/4, 0);
            path = [];
            drawPath();
        }
        else if(STATE === FOURIER){
            STATE = USER;
            start = p.createButton('Show Variable Path');
            start.mousePressed(buttonPress());
        }
    }

}


let waveSketch = new p5(wave, 'waveSketch');