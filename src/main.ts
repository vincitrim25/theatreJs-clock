import * as core from '@theatre/core'
// import studio from '@theatre/studio'
import state from './States/clock-animation.json'

// studio.initialize();

const project = core.getProject('HTML', {state: state});
const sheet_h = project.sheet('Sheet h');
const sheet_m = project.sheet('Sheet m');
const sheet_s = project.sheet('Sheet s');
const hours = sheet_h.object('hours', {
  hours: core.types.number(0, { range: [0, 12] })
});
const minutes = sheet_m.object('minutes', {
  minutes: core.types.number(0, { range: [0, 60] })
});
const seconds = sheet_s.object('seconds', {
  seconds: core.types.number(0, { range: [0, 60] })
});

const now = new Date();
var timeValues = {
  hours: now.getHours() % 12,
  minutes: now.getMinutes(),
  seconds: now.getSeconds()
}

const hoursElement = document.getElementById('hours') ?? new HTMLElement();
const minutesElement = document.getElementById('minutes') ?? new HTMLElement();
const secondsElement = document.getElementById('seconds') ?? new HTMLElement();

hours.onValuesChange((obj) => {
  hoursElement.style.rotate = `${(360/12)*obj.hours}deg`;
})
minutes.onValuesChange((obj) => {
  minutesElement.style.rotate = `${6*obj.minutes}deg`;
})
seconds.onValuesChange((obj) => {
  secondsElement.style.rotate = `${6*obj.seconds}deg`;
})

project.ready.then(() => {
  sheet_h.sequence.position = timeValues.hours * 3600
  sheet_m.sequence.position = timeValues.minutes * 60
  sheet_s.sequence.position = timeValues.seconds
  sheet_h.sequence.play({iterationCount: Infinity})
  sheet_m.sequence.play({ iterationCount: Infinity})
  sheet_s.sequence.play({ iterationCount: Infinity})
})

const clockElement = document.getElementById('numbers');
const numbers: Array<{value: number, x: number, y: number}> = []
const step = -Math.PI / 6
const radius = 235
for(let i=1; i<=12;i++){
  numbers.push({
    value: i,
    x: radius * Math.cos((i * step)),
    y: radius * Math.sin((i * step))
  })
  let n = document.createElement('span');
  n.innerHTML = `${i}`
  n.style.top = `${radius * Math.sin((i * step) - (Math.PI/2))}px`;
  n.style.right = `${radius * Math.cos((i * step) - (Math.PI/2))}px`;
  clockElement?.appendChild(n)
}