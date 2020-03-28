let walls = [];
let box = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let particleX;
let particleY;
let autoMove = true;
var particleInput;

function setup() {
    var canvas = createCanvas(this.windowWidth / 2, this.windowHeight / 2);
    canvas.parent('sketch-box');
    //for (let i = 0; i < 5; i++) {
    //    let x1 = random(width);
    //    let x2 = random(width);
    //    let y1 = random(height);
    //    let y2 = random(height);
    //    walls[i] = new Boundary(x1, y1, x2, y2);
    //}
    box.push(new Boundary(0, 0, width, 0));
    box.push(new Boundary(width, 0, width, height));
    box.push(new Boundary(width, height, 0, height));
    box.push(new Boundary(0, height, 0, 0));
    createBoundaries();

    var newBoundaries = createButton("Draw new boundaries");
    newBoundaries.parent("button-box");
    newBoundaries.class("btn-primary brd-rad-10");
    newBoundaries.mousePressed(createBoundaries);

    particleInput = createButton("Move with cursor");
    particleInput.parent("button-box");
    particleInput.class("btn-primary brd-rad-10 box-shadow");
    particleInput.mousePressed(changeInput);

    particle = new Particle();
}
function createBoundaries() {
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    for (let wall of box) {
        walls.push(wall);
    }
}

function changeInput() {
    autoMove = !autoMove;
    if (autoMove) {
        particleInput.html("Move with cursor");
    } else {
        particleInput.html("Move randomly");
    }
}


function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    particleX = (autoMove) ? noise(xoff) * width : mouseX;
    particleY = (autoMove) ? noise(yoff) * height : mouseY;
    particle.update(particleX, particleY);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;
    //ray.show();
    //ray.lookAt(mouseX, mouseY);

    //let pt = ray.cast(wall);
    //if (pt) {
    //    fill(255);
    //    ellipse(pt.x, pt.y, 8, 8);
    //}
}