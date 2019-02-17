let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
console.log(canvas.width, canvas.height) // adjusts for how big the window is at that moment in time 

let c = canvas.getContext('2d')

let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', 
function(event) {          // mousemove has an event object - with a range of properties 
  mouse.x = event.x
  mouse.y = event.y 
  console.log(mouse)
})

window.addEventListener('resize', // browswer resize code - called every time browser is resized 
  function () {
    c.width = window.innerWidth
    c.height = window.innerHeight

    init()  // circles get initiated dynamically upon resizing browser - function gets called below
})

let maxRadius = 100 
let minRadius = 15

let colorArray = [
  "#776D5A",
  "#B39C4D",
  "#34623F",
  "#1E2F23",
  "C9D6EA"
]

// need to get mouse's position && get distance between mouse position and the circle in order to enlarge / shrink 

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() { // contains the draw circle code from above
    // c.clearRect(0,0,innerWidth, innerHeight) // remove this else each time circle is drawn, the old ones will be deleted
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = "black"
    c.stroke()
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function() { // includes x,y and velocities code - so this changes for each individual circle  
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx;
    this.y += this.dy;

// EP 4 - INTERACTIVITY - calc. distances from mouse and circles 
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
          if (this.radius < maxRadius) {   // circles can't grow larger than 40 
            this.radius +=1
          }
    } else if (this.radius > this.minRadius) {  // this.minRadius bit ensures circles shrink back to their original size
      this.radius -= 1
    }
    

    this.draw() // incl. draw within update function 

  }
  // both update and draw function must be called 
  // draw must be called first so that circle is defined
  // only then can update be called so that properties can be changed 
  // ****** DO THIS BY including DRAW within UPDATE function ******
}

let circlesArr = [] // needs to stay outside of init function 

function init() { // initialises new circles & accounts for browser resize
circlesArr = []   
for (let i=0; i < 200; i++) {
  let radius = Math.random() * 20 + 10; // radius of each circle randomised, for range of 1 - 11 
  let x = Math.random() * (innerWidth - radius * 2) + radius;         // ensure that circles don't hang at edges of screen 
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  // innerDIM - radius * 2 - ensures circle fits within far boundary
  // + radius bit - ensures circle fits within the close x or y boundary

  let dx = (Math.random() - 0.5) * 10; 
  let dy = (Math.random() - 0.5) * 10;
  
  circlesArr.push(new Circle(x, y, dx, dy, radius))
}
}

// needs to include as args the draw method's args or the Circle class's
function animate() {
  requestAnimationFrame(animate)
  // console.log(count)
  // count ++
  c.clearRect(0,0,innerWidth, innerHeight)
  // need another for loop to actually draw each circle from the circlesArr
  for (let i=0; i < circlesArr.length; i++) {
    circlesArr[i].update()           // as the Circle class has update method
  }
}

animate()   // COMMENTED OUT 


