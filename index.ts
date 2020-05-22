const logo = document.querySelector("#logo");
const topLeft = document.querySelector("#triangle-top-left");
const topRight = document.querySelector("#triangle-top-right");
const bottom = document.querySelector("#triangle-bottom");

logo.animate([
  // keyframes
  { transform: 'translateY(0px)' }, 
  { transform: 'translateY(-5px)' },
  { transform: 'translateY(0px)' }
], { 
  // timing options
  duration: 300,
  iterations: Infinity
});

topLeft.animate([
  // keyframes
  { transform: 'translate(0px)' }, 
  { transform: 'translate(-5px, -5px)' },
  { transform: 'translate(0px)' }
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});

topRight.animate([
  // keyframes
  { transform: 'translate(0px)' }, 
  { transform: 'translate(5px, -5px)' },
  { transform: 'translate(0px)' }
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});

bottom.animate([
  // keyframes
  { transform: 'translate(0px)' }, 
  { transform: 'translate(0, 5px)' },
  { transform: 'translate(0px)' }
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});