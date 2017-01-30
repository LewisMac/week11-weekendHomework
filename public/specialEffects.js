var particles = [];
var createParticleEffect = function(x, y)
{
  var angle = Math.floor(Math.random()*360)
  for (var i=0; i < 2; i++)
  {
    var particle = new Particle();
    colourRed = (Math.floor(Math.random()*225))
    colourGreen = (Math.floor(Math.random()*225))
    colourBlue = (Math.floor(Math.random()*225))
    particle.x = x;
    particle.y = y;

    particle.color = "gold";
    var speed = 50.0;
    particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
    particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
    particles.push(particle);
  }
}

// img.onload = function(){
//   context.drawImage(img, 0, 0, 600, 500);
// }
var update = function (delay){
  context.fillStyle = "#FFF";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  
  for (var i=0; i<particles.length; i++){
    var particle = particles[i];
    particle.update(delay);
    particle.draw(context);
  }
}

window.onload = function(){

  canvas = document.getElementById("main-canvas");
  context = canvas.getContext("2d");
  
  var width = context.canvas.width = window.innerWidth;
  var height = context.canvas.height = window.innerHeight;
  canvas.onmousemove = function(event){
    createParticleEffect(event.x, event.y);
  };

  var frameRate = 60.0;
  var frameDelay = 1000.0/frameRate;
  setInterval(function()
  {
    update(frameDelay);
  }, frameDelay);
  
  app();

}