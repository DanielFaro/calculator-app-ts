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

const chimes = new Audio(chimes1);
const crashLeft = new Audio(crash1);
const crashRight = new Audio(crash2);
const roll = new Audio(drumroll);
const hihatcl = new Audio(hihat_closed);
const hihatop = new Audio(hihat_open);
const leftTom = new Audio(hitom);
const mtom = new Audio(midtom);
const ltom = new Audio(lowtom);
const block = new Audio(woodblock);
const rd = new Audio(ride);
const snare = new Audio(snare1);
const bell = new Audio(cowbell);
const bass = new Audio(kick);
chimes.playbackRate = 2;
crashRight.playbackRate = 2;
rd.playbackRate = 4;

export const SFX = [
  { btn: "c", sound: chimes },
  { btn: "7", sound: crashLeft },
  { btn: "8", sound: crashRight },
  { btn: "=", sound: roll },
  { btn: "1", sound: hihatcl },
  { btn: "4", sound: hihatop },
  { btn: "5", sound: leftTom },
  { btn: "9", sound: rd },
  { btn: "2", sound: snare },
  { btn: "0", sound: bass },
  { btn: "6", sound: mtom },
  { btn: "3", sound: ltom },
  { btn: "del", sound: block },
  { btn: "%", sound: bell },
];
