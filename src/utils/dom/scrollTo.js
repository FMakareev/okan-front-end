/** @link https://stackoverflow.com/questions/50589137/scrollto-speed-duration-setting */

// Element to move, time in ms to animate
export function scrollTo(element, duration, durationFunction) {
  let e = document.documentElement;
  if(e.scrollTop===0){
    let t = e.scrollTop;
    ++e.scrollTop;
    e = t+1===e.scrollTop--?e:document.body;
  }
  scrollToC(e, e.scrollTop, element, duration, durationFunction);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration, durationFunction = easeOutCuaic) {
  if (duration <= 0) return;
  if(typeof from === "object")from=from.offsetTop;
  if(typeof to === "object")to=to.offsetTop;

  scrollToX(element, from, to, 0, 1/duration, 20, durationFunction);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed<= 0) {
    element.scrollTop = xTo;
    return;
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
  t01 += speed * step;

  setTimeout(function() {
    scrollToX(element, xFrom, xTo, t01, speed, step, motion);
  }, step);
}

export function linearTween(t){
  return t;
}

export function easeInQuad(t){
  return t*t;
}

export function easeOutQuad(t){
  return -t*(t-2);
}

export function easeInOutQuad(t){
  t/=0.5;
  if(t<1)return t*t/2;
  t--;
  return (t*(t-2)-1)/2;
}

export function easeInCuaic(t){
  return t*t*t;
}

export function easeOutCuaic(t){
  t--;
  return t*t*t+1;
}

export function easeInOutCuaic(t){
  t/=0.5;
  if(t<1)return t*t*t/2;
  t-=2;
  return (t*t*t+2)/2;
}

export function easeInQuart(t){
  return t*t*t*t;
}

export function easeOutQuart(t){
  t--;
  return -(t*t*t*t-1);
}

export function easeInOutQuart(t){
  t/=0.5;
  if(t<1)return 0.5*t*t*t*t;
  t-=2;
  return -(t*t*t*t-2)/2;
}

export function easeInQuint(t){
  return t*t*t*t*t;
}

export function easeOutQuint(t){
  t--;
  return t*t*t*t*t+1;
}


export default scrollTo;
