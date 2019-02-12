let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
console.log(canvas.width, canvas.height) // adjusts for how big the window is at that moment in time 

let c = canvas.getContext('2d')

    // c.fillStyle = "rgba(255,0,255, 0.5)"; // color for rectangles  // 4th arg is opacity (between 0 and 1) 
    // c.fillRect(100, 100, 100, 100)
    // c.fillRect(400, 100, 500, 30)
    // c.fillStyle = "rgba(255,255,255, 1)";
    // c.fillRect(300, 100, 150, 150)

  // fillStyle must precede the fillRect 
// for dif colours - eacg fillRect will have a dif fillStyle preceding it


// lines

    // c.beginPath();
    // c.moveTo(20,50); // for lines, moveTo - takes (x,y)
    // c.lineTo(500,500);
    // c.strokeStyle = "#fa2342"  // color for lines
    // c.stroke(); // needed for the line to show


// arcs 

    // c.fillStyle = "green"
    // c.beginPath() // to make independent shapes - each item must have beginPath() - otherwise items will be connected to the last drawn item 
    // c.arc(300, 300, 50, 0, Math.PI * 2, false);
    // c.closePath();
    // c.fill();  // fills in the arc accourding to fillStyle...


// creating multiple arcs / shapes - FOR LOOP 

// SPOTTED ARCS 

    // for (let i = 0; i < 30; i++) {

    //     function getRandomColour(){                      // function for creating random rgba color
    //       var red = Math.floor(Math.random()* 255);
    //       var green = Math.floor(Math.random() * 255);
    //       var blue = Math.floor(Math.random() * 255);
    //       return "rgb("+red+","+green+"," +blue+" )";  
    //     }

    //     let x = Math.random() * window.innerWidth
    //     let y = Math.random() * window.innerHeight
    //     c.fillStyle = getRandomColour()            // the fill style attribute calls the getRandomColour() function
    //     c.beginPath() // to make independent shapes - each item must have beginPath() - otherwise items will be connected to the last drawn item 
    //     c.arc(x, y, 50, 0, Math.PI * 2, false);
    //     c.fill()     // this draws the fill style to create spotted arcs
    // }

// challenge - randomise colours within for loop  - COMPLETED ABOVE for SPOTTED ARCS

// COLOURED OUTLINE ARCS 

    // for (let i = 0; i < 30; i++) {

    //   function getRandomColour(){                      // function for creating random rgba color
    //     var red = Math.floor(Math.random()* 255);
    //     var green = Math.floor(Math.random() * 255);
    //     var blue = Math.floor(Math.random() * 255);
    //     return "rgb("+red+","+green+"," +blue+" )";  
    //   }

    //   let x = Math.random() * window.innerWidth
    //   let y = Math.random() * window.innerHeight
    //   c.strokeStyle = getRandomColour()            // the fill style attribute calls the getRandomColour() function
    //   c.beginPath() // to make independent shapes - each item must have beginPath() - otherwise items will be connected to the last drawn item 
    //   c.arc(x, y, 50, 0, Math.PI * 2, false);
    //   c.stroke()     // this draws the fill style to create spotted arcs
    // }

// EPISODE 3 - Animation 


    // can use an animate function to use requestAnimationFrame function - takes another function in as arg
    // this is done - recursively - the animate function is an argument in the requestAnimationFrame function

// let count = 1   // prove that animate is occuring many times with console.log and count++ below 

    //  let circle = new Circle(200, 200)
    //   let x = Math.random() * innerWidth;
    //   let y = Math.random() * innerHeight;
    //   let dx = (Math.random() - 0.5) * 8;  // velocity of x
    //   let dy = (Math.random() - 0.5) * 8;
    //   // randomise starting points and velocities 
    //   let radius = 30;
    //   function animate() {
    //     requestAnimationFrame(animate)
    //     // console.log(count)
    //     // count ++
    //     c.clearRect(0,0,innerWidth, innerHeight)
    //     circle.draw()
    //     c.beginPath()
    //     c.arc(x, y, radius, 0, Math.PI * 2, false)
    //     c.strokeStyle = "red"
    //     c.stroke()

    //     // bouncing the arc off the screen
    //     if (x + radius > innerWidth || x - radius < 0) {
    //       dx = -dx
    //     }
    //     if (y + radius > innerHeight || y - radius < 0) {
    //       dy = -dy
    //     }
    //     x += dx;
    //     y += dy;
    //   }

    //   animate()

// indented code above is repeated below + edited a bit for the OOP section 

  // OOP - JS - create a Circle class  + EPISODE 4 - EVENT LISTENERS

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
              // which adds and clears to the circle array each time 
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
  for (let i=0; i < 500; i++) {
    let radius = Math.random() * 20 + 10; // radius of each circle randomised, for range of 1 - 11 
    let x = Math.random() * (innerWidth - radius * 2) + radius;         // ensure that circles don't hang at edges of screen 
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    // innerDim - radius * 2 - ensures circle fits within far boundary
    // + radius bit - ensures circle fits within the close x or y boundary

    let dx = (Math.random() - 0.5) * 10;  // velocity of x
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

  // creating variable to hold instance of new circle



  // x,y, and draw and any other class methods / properties are stored within the cicle variable


