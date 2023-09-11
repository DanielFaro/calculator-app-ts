import { useState, useRef, useEffect } from "react";
import ScreenWrapper from "./containers/ScreenWrapper";
import Screen from "./components/Screen";
import ButtonWrapper from "./containers/ButtonWrapper";
import Button from "./components/Button";
import { SFX } from "./assets/SFX/index";

const btns: (string | number)[][] = [
  [7, 8, 9, "%", "del"],
  [4, 5, 6, "X", "/"],
  [1, 2, 3, "-", "+/-"],
  ["C", 0, ".", "+", "="],
];

const noSpaceOrLeadZeros = (str: string) =>
  str.replace(/\s/g, "").replace(/^0+(0$|[1-9])/gm, "$1");
interface CalcInterface {
  operator: string;
  firstOperand: string | number;
  secondOperand: string | number;
  result: string;
}

const App = () => {
  const [calc, setCalc] = useState<CalcInterface>({
    operator: "",
    firstOperand: 0,
    secondOperand: 0,
    result: "0",
  });
  const [playList, setPlayList] = useState<[]>([]);
  // const [buttonClicked, setButtonClicked] = useState<string | number>();
  // initialized audioRef
  const audioRef = useRef(new Audio());

  // useEffect(() => {
  //   console.log("## inside useEffect calc", audioRef.current.duration);
  //   if (calc.result !== "0") {
  //     playResult();
  //   }
  // }, [calc]);

  // maybe create a useEffect for each button click, every function, that
  // way can set audioref

  const playResult = (result: string) => {
    if (result !== "0" && typeof result === "string") {
      result.split("").forEach((num) => {
        setTimeout(
          () => {
            let sound = SFX.filter((effect) => effect.btn === String(num));
            let soundSrc = sound[0].src;

            audioRef.current = new Audio(soundSrc);
            console.log("## resultArray in playResult ==", audioRef.current);
            audioRef.current.play();
          },
          audioRef.current.duration ? audioRef.current.duration : 0
        );
      });
    }
  };

  const playEffect = (btn: string | number) => {
    // NEED TO ignore 'e' in string!!!!
    // if result iterate over list and set ne audioRef.current,
    // only set after sound is complete, maybe add duration and setTimeout
    // equal to the interval then set new audioRef

    audioRef.current.pause();

    let sound = SFX.filter((effect) => effect.btn === String(btn));
    let soundSrc = sound[0].src;

    audioRef.current = new Audio(soundSrc);
    audioRef.current.play();
  };

  // cann add a call to setAudio, then have a useEffect to track audio change
  //
  const compute = (a: number, b: number, operator: string): number =>
    operator === "+"
      ? a + b
      : operator === "-"
      ? a - b
      : operator === "X"
      ? a * b
      : a / b;

  const onClearClick = () => {
    setCalc({
      ...calc,
      operator: "",
      firstOperand: 0,
      secondOperand: 0,
      result: "0",
    });
  };

  const onOperatorClick = (value: string): void => {
    const { firstOperand, operator, secondOperand, result } = calc;
    // if a user does 33 * 66 - , when they click - for example
    // we must send the newOperator to onEquals click
    console.log("## onOperatorCLick ==", value);
    if (firstOperand && operator && secondOperand && result === "0") {
      onEqualsClick(value);
    } else {
      return setCalc({
        ...calc,
        operator: calc.operator ? calc.operator : value,
      });
    }
  };

  const onPercentClick = () => {
    const { firstOperand, operator, secondOperand, result } = calc;
    // devide by 100
    // if only first operand, divide by 100 and set firstOperand
    if (firstOperand && !operator && !secondOperand && result === "0") {
      setCalc({
        ...calc,
        firstOperand: String(Number(firstOperand) / 100),
      });
    } else if (firstOperand && operator && secondOperand && result === "0") {
      setCalc({
        ...calc,
        secondOperand: String(Number(secondOperand) / 100),
      });
    } else {
      const percent = String(Number(result) / 100);
      setCalc({
        ...calc,
        firstOperand: percent,
        result: percent,
      });
    }
  };

  const onInvertNumClick = (): void => {
    const { firstOperand, operator, secondOperand, result } = calc;
    // need to check whats been entered
    // if only first operand, multiply firstOperand by -1

    // if equals was clicked and we are currently looking at the result
    if (firstOperand === result && !operator && secondOperand === 0) {
      const inverted = String(Number(result) * -1);
      setCalc({
        ...calc,
        firstOperand: inverted, // this is needed in case they hit an operator next
        result: inverted,
      });
    } else if (firstOperand && !operator && !secondOperand) {
      setCalc({
        ...calc,
        firstOperand: String(Number(firstOperand) * -1),
      });
    } else if (firstOperand && operator && secondOperand && result === "0") {
      setCalc({
        ...calc,
        secondOperand: String(Number(secondOperand) * -1),
      });
    }
  };

  // could create a refs array and loop through
  // at the end, play through loop at double speed with playBack(2)

  // const createPlayList = (playList: string) => {
  //   console.log("## playList createPlaylist ==", playList, playList.split(""));
  //   // setPlayList([...playList, chosenSound[0].sound])
  //   // console.log("## split playlist ==", playList.entries());
  //   playList.split("").map((effect) => playEffect(effect));
  // };

  // const playEffect = (num: string | number) => {
  //   let sounds = SFX.filter((effect) => effect.btn === String(num));
  //   let chosenSound = sounds[0].sound;
  //   console.log("## sound in playEffect ==", chosenSound, typeof chosenSound);
  //   setAudio(chosenSound);
  //   if (!audio?.pau) {
  //     ff
  //   }
  //   chosenSound.play();
  // };

  const onNumClick = (value: string | number): void => {
    const { operator, firstOperand, secondOperand, result } = calc;

    setCalc({
      ...calc,
      operator: operator,
      firstOperand:
        !secondOperand && !operator && String(firstOperand).length < 17
          ? noSpaceOrLeadZeros(String(firstOperand) + String(value))
          : firstOperand,
      secondOperand:
        firstOperand && operator && String(secondOperand).length < 17
          ? noSpaceOrLeadZeros(String(secondOperand) + String(value))
          : secondOperand,
      result:
        (firstOperand && operator) || (secondOperand && operator)
          ? "0"
          : result,
      /* if a user already did one calc, then immediately presses an operator and another number,
       it will clear result so the second operator will be displayed next instead of last result*/
    });
  };

  // if result contains 'e', then remove starting at index -4 until length is 17
  const onEqualsClick = (nextOperator: string) => {
    const { operator, firstOperand, secondOperand, result } = calc;
    // find index of e and then can adjust tempstrings
    // for some reason it allows numbers up to 20 digits, which flows out of result box
    // need to check if more than 17 digits, and if so, calculate how many remain,
    // if 4 digits remain, since e+10 is minimum 4 places, must remove at least 4 places
    // maybe there is a calc library or math.floor or something
    if (result === "0") {
      playEffect("=");
    }

    // if number has a decimal point, only go to 4 digits
    const tempResult = compute(
      Number(firstOperand),
      Number(secondOperand),
      operator
    );
    let tempString = String(1 * Number(tempResult.toFixed(4))); // multiplying by 1 removed unnecessary trailing zeroes

    let newResult: string;

    if (!tempString.includes("e") && tempString.length > 17) {
      tempString = Number(tempResult).toExponential(); // this returns a string
    }

    // If the exponentiated result is too long to fit, we remove a few characters from before 'e'
    // and concat with the ending (i.e. e+14), so the total result length is 17 or less in order to fit
    if (tempString.includes("e") && tempString.length > 17) {
      // this fixed values like 2.34534324e+17 to be 2.34e+17
      const newTemp = String(
        Number(
          tempString.substring(
            0,
            2 * tempString.indexOf("e") - tempString.length - 1
          )
        ).toFixed(4)
      );

      // this removes (i.e. e+17) to a separate substring to be concatenated later
      const tempEnding = tempString.substring(
        tempString.indexOf("e"),
        tempString.length
      );
      newResult = newTemp.concat(tempEnding);
    } else {
      newResult = tempString;
    }

    // need to add a case where user typed i.e 33 * 66 -, we would need to call onEqualsClick
    // from onOperatorClicked, but pass the operator, the result would be showing the current result onscreen
    // and having the operator in memory ready for the next operand

    if (
      firstOperand &&
      operator &&
      secondOperand &&
      result === "0" &&
      nextOperator
    ) {
      setCalc({
        ...calc,
        operator: nextOperator,
        firstOperand: newResult,
        secondOperand: 0,
        result: newResult,
      });
      // createPlayList(newResult);
    } else {
      if (firstOperand && operator && secondOperand) {
        console.log("## inside setCalc for onEqualClick", newResult);
        setTimeout(() => {
          setCalc({
            ...calc,
            operator: "",
            firstOperand: newResult,
            secondOperand: 0,
            result: newResult,
          });
          playResult(newResult);
        }, 2000);
      }
      // createPlayList(newResult);
    }
  };

  // if there is a first operand and no operator and no second operand, pop from firstOperand
  // if there is a first operand and an operator and a second operand, pop from second operand
  // if there is a result, pop from result;

  const onDeleteClick = () => {
    const { operator, firstOperand, secondOperand, result } = calc;
    // check if any value contains 'e' and if so do nothing. User will have to clear or press an operator
    if (
      String(firstOperand).includes("e") ||
      String(secondOperand).includes("e") ||
      String(result).includes("e")
    ) {
      setCalc({ ...calc });
    } else {
      setCalc({
        ...calc,
        firstOperand:
          firstOperand &&
          !operator &&
          !secondOperand &&
          String(firstOperand).length > 1
            ? noSpaceOrLeadZeros(String(firstOperand).slice(0, -1))
            : String(firstOperand).length === 1
            ? 0
            : firstOperand,
        secondOperand:
          firstOperand &&
          operator &&
          secondOperand &&
          String(secondOperand).length < 17
            ? noSpaceOrLeadZeros(String(secondOperand).slice(0, -1))
            : secondOperand,
        result: result ? String(result).slice(0, -1) : result,
        /* if a user already did one calc, then immediately presses an operator and another number,
       it will clear result so the second operator will be displayed next instead of last result*/
      });
    }
  };

  const onButtonClick = (value: string | number) => {
    if (value !== "=") {
      playEffect(value);
    }
    return value === "/" || value === "X" || value === "-" || value === "+"
      ? onOperatorClick(value)
      : value === "C"
      ? onClearClick()
      : value === "="
      ? onEqualsClick("")
      : value === "%"
      ? onPercentClick()
      : value === "+/-"
      ? onInvertNumClick()
      : value === "del"
      ? onDeleteClick()
      : onNumClick(value);
  };
  // if first operand equals result show result, otherwise show second, otherwise first
  // should we allow them to go past 5 decimal places when entering? prolly not
  // also need to add commas for large numbers, only before decimal point, and if not include 'e' character
  return (
    <div className="App">
      <ScreenWrapper>
        <Screen
          value={
            calc.result === calc.firstOperand
              ? calc.result
              : false || calc.secondOperand || calc.firstOperand
          }
        />
        <ButtonWrapper>
          {btns.flat().map((btn, index) => {
            return (
              <Button
                key={index}
                className={
                  btn === "="
                    ? "equals"
                    : typeof btn === "number"
                    ? "number"
                    : btn === "C"
                    ? "clear"
                    : "button"
                }
                value={btn}
                onClick={() => onButtonClick(btn)}
              />
            );
          })}
        </ButtonWrapper>
      </ScreenWrapper>
    </div>
  );
};

export default App;
