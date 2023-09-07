import chimes1 from "./chimes1.mp3";
import chimes2 from "./chimes2.mp3";
import cowbell from "./cowbell.mp3";
import crash1 from "./crash1.mp3";
import crash2 from "./crash2.mp3";
import drumroll from "./drumroll.mp3";
import hihat_closed from "./hihat_closed.mp3";
import hihat_open from "./hihat_open.mp3";
import hitom from "./hitom.mp3";
import kick from "./kick.mp3";
import lowtom from "./lowtom.mp3";
import midtom from "./midtom.mp3";
import ride from "./ride.mp3";
import snare1 from "./snare1.mp3";
import snare2 from "./snare2.mp3";
import woodblock from "./woodblock.mp3";
import acousticstrum1 from "./acousticstrum1.mp3";
import acousticstrum2 from "./acousticstrum2.mp3";
import marimba1 from "./marimba1.mp3";
import marimba2 from "./marimba2.mp3";
import marimba3 from "./marimba3.mp3";
import marimba4 from "./marimba4.mp3";
import electriclick1 from "./electriclick1.mp3";

// export const SFX = {
//   c: chimes1,
//   chimes2,
//   cowbell,
//   7: crash1,
//   8: crash2,
//   "=": drumroll,
//   1: hihat_closed,
//   4: hihat_open,
//   5: hitom,
//   0: kick,
//   3: lowtom,
//   6: midtom,
//   del: woodblock,
//   9: ride,
//   2: snare1,
//   snare2,
// };

// const chimes = new Audio(chimes1);
// const crashLeft = new Audio(crash1);
// const crashRight = new Audio(crash2);
// const roll = new Audio(drumroll);
// const hihatcl = new Audio(hihat_closed);
// const hihatop = new Audio(hihat_open);
// const leftTom = new Audio(hitom);
// const mtom = new Audio(midtom);
// const ltom = new Audio(lowtom);
// const block = new Audio(woodblock);
// const rd = new Audio(ride);
// const snare = new Audio(snare1);
// const bell = new Audio(cowbell);
// const bass = new Audio(kick);
// chimes.playbackRate = 2;
// crashRight.playbackRate = 2;
// rd.playbackRate = 4;

export const SFX = [
  { btn: "C", src: chimes1, duration: 1500 },
  { btn: "7", src: crash1, duration: 1500 },
  { btn: "8", src: crash2, duration: 1100 },
  { btn: "=", src: drumroll, duration: 1000 },
  { btn: "1", src: hihat_closed, duration: 170 },
  { btn: "4", src: hihat_open, duration: 1000 },
  { btn: "5", src: hitom, duration: 250 },
  { btn: "9", src: ride, duration: 1150 },
  { btn: "2", src: snare1, duration: 190 },
  { btn: "0", src: kick, duration: 70 },
  { btn: "6", src: midtom, duration: 300 },
  { btn: "3", src: lowtom, duration: 550 },
  { btn: "del", src: woodblock, duration: 800 },
  { btn: "%", src: acousticstrum1, duration: 550 },
  { btn: "X", src: marimba1, duration: 335 },
  { btn: "-", src: marimba2, duration: 360 },
  { btn: "+", src: marimba3, duration: 380 },
  { btn: ".", src: electriclick1, duration: 935 },
  { btn: "/", src: marimba4, duration: 400 },
  { btn: "+/-", src: cowbell, duration: 120 },
];
