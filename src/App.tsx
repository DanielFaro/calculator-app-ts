import { useState } from 'react';
import ScreenWrapper from './containers/ScreenWrapper';
import Screen from './components/Screen';
import ButtonWrapper from './containers/ButtonWrapper';
import Button from './components/Button';

const btns: (string | number)[][] = [
  [7, 8, 9, '+/-', 'del'],
  [4, 5, 6, 'X', '/'],
  [1, 2, 3, '-', '='],
  ['C', 0, '.', '+'],
];

const noSpaceOrLeadZeros = (str: string) =>
  str.replace(/\s/g, '').replace(/^0+(0$|[1-9])/gm, '$1');
interface CalcInterface {
  operator: string;
  firstOperand: string | number;
  secondOperand: string | number;
  result: string | number;
}

const App = () => {
  const [calc, setCalc] = useState<CalcInterface>({
    operator: '',
    firstOperand: 0,
    secondOperand: 0,
    result: 0,
  });

  const compute = (a: number, b: number, operator: string): number =>
    operator === '+'
      ? a + b
      : operator === '-'
      ? a - b
      : operator === 'X'
      ? a * b
      : a / b;

  const onClearClick = () => {
    setCalc({
      ...calc,
      operator: '',
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
    console.log('## onPercentClic');
  };

  const onInvertNumClick = (): void => {
    console.log('## onInvertNumClick');
  };

  const onNumClick = (value: string | number): void => {
    setCalc({
      ...calc,
      operator: calc?.operator,
      firstOperand:
        !calc.secondOperand &&
        !calc.operator &&
        String(calc.firstOperand).length < 18
          ? noSpaceOrLeadZeros(String(calc.firstOperand) + String(value))
          : calc.firstOperand,
      secondOperand:
        calc.firstOperand &&
        calc.operator &&
        String(calc.secondOperand).length < 18
          ? noSpaceOrLeadZeros(String(calc.secondOperand) + String(value))
          : calc.secondOperand,
      result:
        (calc.firstOperand && calc.operator) ||
        (!calc.secondOperand && !calc.operator)
          ? 0
          : calc?.result,
      /* if a user already did one calc, then immediately presses an operator and another number,
       it will clear result so the second operator will be displayed next instead of last result*/
    });
  };

  const onEqualsClick = () => {
    const { operator, firstOperand, secondOperand } = calc;
    const newResult = String(
      compute(Number(firstOperand), Number(secondOperand), operator)
    );

    if (firstOperand && operator && secondOperand) {
      setCalc({
        ...calc,
        operator: '',
        firstOperand: newResult,
        secondOperand: 0,
        result: newResult,
      });
    }
  };

  const onButtonClick = (value: string | number) => {
    return value === '/' || value === 'X' || value === '-' || value === '+'
      ? onOperatorClick(value)
      : value === 'C'
      ? onClearClick()
      : value === '='
      ? onEqualsClick()
      : value === '%'
      ? onPercentClick()
      : value === '+/-'
      ? onInvertNumClick()
      : onNumClick(value);
  };

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
                className={btn === '=' ? 'equals' : 'button'}
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
