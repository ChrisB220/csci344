let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5Circles();
    draw5RedSquares();
    draw5CirclesFor();
    drawNCircles(20);
    drawNCirclesFlexible(30, 25, 400, 0);
    drawNShapesFlexible(10, 30, 700, 400, "circle");
    drawNShapesFlexible(10, 30, 800, 600, "square");
    drawNShapesDirectionFlexible(15, 30, 1500, 100, "circle", "row");
    drawNShapesDirectionFlexible(8, 40, 1300, 300, "square", "ahhh");
    // dominoSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}


function draw5CirclesFor()
{
    let y = 200;
    fill("blue");
    for(let i = 0; i < 5; i++)
    {
        circle(200, y, 50);
        y = y + 50;
    }
}

function drawNCircles(n)
{
    let y = 500;
    for(let i = 0; i < n; i++)
    {
        circle(500, y, 50);
        y = y + 50
    }
}

function drawNCirclesFlexible(n, size, x, y)
{
    fill("yellow");
    for(let i = 0; i < n; i++)
    {
        circle(x, y, size);
        y = y + 50;
    }
}

function drawNShapesFlexible(n, size, x, y, shape)
{
    fill("green");
    for(let i = 0; i < n; i++)
    {
        if(shape === "circle")
        {
            circle(x, y, size);
            y = y + 50;
        }
        else
        {
            square(x, y, size);
            y = y + 50;
        }
    }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction)
{
    fill("purple");
    for(let i = 0; i < n; i++)
    {
        if(shape === "circle")
        {
            if(direction === "row")
            {
                circle(x, y, size);
                x = x + size;
            }
            else 
            {
                circle(x, y, size);
                y = y + size;
            }
        }
        else
        {
            if(direction === "row")
            {
                square(x, y, size);
                x = x + size;
            }
            else
            {
                square(x, y, size);
                y = y + size;
            }
        }
    }
}

function dominoSquares()
{
        fill("orange");
        console.log("Hi");
        for(let i = 0; i <= 1800; i = i + 100)
        {
            for(let j = 0; j <= 900; j = j + 100)
            {
                square(i, j, 100);
            }
        }
    
}

