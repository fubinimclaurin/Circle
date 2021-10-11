let x = [];
let fourierX;
let time = 0;
let path = [];

let slider;

function setup() {
  createCanvas(1000, 1000);
  const inc = 5;
  for (let i = 0; i < drawing.length; i += inc) {
    const z = new Complex(drawing[i].x - 500, drawing[i].y - 500);
    x.push(z);
  }
  fourierX = dft(x);
  console.log(fourierX);
  fourierX.sort((a, b) => b.ampl - a.ampl);
}
function cycles(x, y, rot, fourier) {
  for (let i = 0; i < fourierX.length; i++) {
    let prevx = x;
    let prevy = y;
    let fq = fourier[i].fq;
    let radius = fourier[i].ampl;
    let phase = fourier[i].phase;
    x += radius * cos(fq * time + phase + rot);
    y += radius * sin(fq * time + phase + rot);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    stroke(255, 10);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  let v = cycles(width / 2, height / 2, 0, fourierX);
  path.unshift(v);

  stroke(255);

  beginShape();
  for (let i = 0; i < path.length; i++) {
    noFill();
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
