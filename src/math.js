import { evaluate } from 'mathjs';

const calculateResult = () => {
  try {
    const expression = display.join(""); 
    const answer = evaluate(expression); 
    setDisplay([answer % 1 !== 0 ? parseFloat(answer.toFixed(4)) : answer]);
    setResult(true);
    setDecimal(false);
  } catch (err) {
    console.error("Invalid calculation");
    setDisplay(["Error"]);
  }
};
