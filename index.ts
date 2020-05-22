const logo = document.querySelector("#logo");
const topLeft = document.querySelector("#triangle-top-left");
const topRight = document.querySelector("#triangle-top-right");
const bottom = document.querySelector("#triangle-bottom");

interface TimingOptions {
  duration: number,
  iterations: number
}

const durationSlow = 3000;
const durationMedium = 1000;
const durationFast = 500;

const timingOptions = (duration: number, iterations: number): TimingOptions => {
  return { duration, iterations }
}

const translateOptions = (args: Array<string>[]): Keyframe[] => {
  return args.map(item => {
    return {
      transform: `translate(${item[0]}, ${item[1]})`
    }
  });
}

const breakOutAnimationTopLeft = [
  ['0px', '0px'],
  ['-3px', '-3px'],
  ['0px', '0px']
];

const breakOutAnimationTopRight = [
  ['0px', '0px'],
  ['3px', '-3px'],
  ['0px', '0px']
];

const breakOutAnimationBottom = [
  ['0px', '0px'],
  ['0', '3px'],
  ['0px', '0px']
];

topLeft.animate(
  translateOptions(breakOutAnimationTopLeft),
  timingOptions(durationMedium, Infinity)
);

topRight.animate(
  translateOptions(breakOutAnimationTopRight),
  timingOptions(durationMedium, Infinity)
);

bottom.animate(
  translateOptions(breakOutAnimationBottom),
  timingOptions(durationMedium, Infinity)
);