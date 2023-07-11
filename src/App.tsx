import { useState } from "react";
import ScreenWrapper from "./containers/ScreenWrapper";
import Screen from "./components/Screen";
import ButtonWrapper from "./containers/ButtonWrapper";
import Button from "./components/Button";

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
  result: string | number;
}

const App = () => {
  const [calc, setCalc] = useState<CalcInterface>({
    operator: "",
    firstOperand: 0,
    secondOperand: 0,
    result: 0,
  });

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
      result: 0,
    });
  };

  const onOperatorClick = (value: string): void => {
    return setCalc({
      ...calc,
      operator: calc.operator ? calc.operator : value,
    });
  };

  const onPercentClick = () => {
    const { firstOperand, operator, secondOperand, result } = calc;
    console.log("## onPercentClick");
    // devide by 100
    // if only first operand, divide by 100 and set firstOperand
    if (firstOperand && !operator && !secondOperand) {
      const percent = String(Number(firstOperand) / 100);
      setCalc({
        ...calc,
        firstOperand: percent,
      });
    } else if (firstOperand && operator && secondOperand && !result) {
      const percent = String(Number(secondOperand) / 100);
      setCalc({
        ...calc,
        secondOperand: percent,
      });
    } else {
      const percent = String(Number(result) / 100);
      setCalc({
        ...calc,
        result: percent,
      });
    }
    // if there is a first, secondOperand and an operator, divide second operand by 100
    // if there is a non zero result, divide by 100 and set result
  };

  const onInvertNumClick = (): void => {
    const { firstOperand, operator, secondOperand, result } = calc;
    console.log("## onInvertNumClick ==", {
      firstOperand,
      operator,
      secondOperand,
      result,
    });
    // need to check whats been entered
    // if only first operand, multiply firstOperand by -1

    // if equals was clicked and we are currently looking at the result
    if (firstOperand === result && !operator && secondOperand === 0) {
      const inverted = String(Number(result) * -1);
      console.log("## inside Inverted Else ==", inverted);
      setCalc({
        ...calc,
        firstOperand: inverted, // this is needed in case they hit an operator next
        result: inverted,
      });
    } else if (firstOperand && !operator && !secondOperand) {
      const inverted = String(Number(firstOperand) * -1);
      setCalc({
        ...calc,
        firstOperand: inverted,
      });
    } else if (firstOperand && operator && secondOperand && !result) {
      const inverted = String(Number(secondOperand) * -1);
      console.log("## inside second Operand invert ==", {
        firstOperand,
        operator,
        inverted,
        result,
      });

      setCalc({
        ...calc,
        secondOperand: inverted,
      });
    }
    // if there is a first operand, an second operand, no result, multiply secondOperand by -1
    // if there is a non zero result, multiply result by -1

    // setCalc({ ...calc, firstOperand: Number(calc.firstOperand) * -1 });
  };

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
        (firstOperand && operator) || (secondOperand && operator) ? 0 : result,
      /* if a user already did one calc, then immediately presses an operator and another number,
       it will clear result so the second operator will be displayed next instead of last result*/
    });
  };

  // if result contains 'e', then remove starting at index -4 until length is 17
  // if result contains 'e' disable delete
  const onEqualsClick = () => {
    const { operator, firstOperand, secondOperand, result } = calc;
    console.log("## inside onEquals click ==", {
      firstOperand,
      operator,
      secondOperand,
      result,
    });
    // find index of e and then can adjust tempstrings
    // for some reason it allows numbers up to 20 digits, which flows out of result box
    // need to check if more than 17 digits, and if so, calculate how many remain,
    // if 4 digits remain, since e+10 is minimum 4 places, must remove at least 4 places
    // maybe there is a calc library or math.floor or something

    // if number has a decimal point, only go to 4 digits
    const tempResult = compute(
      Number(firstOperand),
      Number(secondOperand),
      operator
    );
    let tempString = String(1 * Number(tempResult.toFixed(4))); // multiplying by 1 removed unnecessary trailing zeroes

    let newResult;

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

    if (firstOperand && operator && secondOperand) {
      setCalc({
        ...calc,
        operator: "",
        firstOperand: newResult,
        secondOperand: 0,
        result: newResult,
      });
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
    return value === "/" || value === "X" || value === "-" || value === "+"
      ? onOperatorClick(value)
      : value === "C"
      ? onClearClick()
      : value === "="
      ? onEqualsClick()
      : value === "%"
      ? onPercentClick()
      : value === "+/-"
      ? onInvertNumClick()
      : value === "del"
      ? onDeleteClick()
      : onNumClick(value);
  };
  console.log("## calc.result before render ==", calc.result);
  return (
    <div className="App">
      <ScreenWrapper>
        <Screen
          value={calc.result || calc.secondOperand || calc.firstOperand}
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
