"use strict";

export const createCombination = () => [...generate()];

export const throw_dice = () => {
  const rand = Math.random();

  if (rand < 1 / 6) return 1;
  if (rand < 1 / 3) return 2;
  if (rand < 1 / 2) return 3;
  if (rand < 2 / 3) return 4;
  if (rand < 5 / 6) return 5;
  else return 6;
};

export const generate = function* () {
  let count = 5;
  while (count-- > 0) yield throw_dice();
};

export const searchComibination = (combinations) => {
  const diffNumber = new Set(combinations);
  let [num1, num2, num3] = [null, null, null];

  // yam
  if (diffNumber.size === 1)
    return { figure: "yam", numbers: [diffNumber.values().next().value] };

  // square
  if (diffNumber.size === 2) {
    num1 = diffNumber.values().next().value;
    num2 = diffNumber.values().next().value;

    const squareNumber = combinations.count(num1) === 4 ? num1 : num2;

    return { figure: "square", numbers: [squareNumber] };
  }

  // 11 2 33  => 1 2 3  1 1 1 2 3
  if (diffNumber.size === 3) {
    num1 = diffNumber.values().next().value;
    num2 = diffNumber.values().next().value;
    num3 = diffNumber.values().next().value;

    const double = combinations
      .filter((num) => combinations.count(num1) === 2)
      .filter((num) => combinations.count(num2) === 2)
      .filter((num) => combinations.count(num3) === 2);

    return { figure: "double", numbers: double };
  }

  return {
      figure : null, numbers : null
  }
};

Object.defineProperties(Array.prototype, {
  count: {
    value: (value) =>
      this.reduce((total, curr) => (curr === value ? total + 1 : total), 0),
  },
});
