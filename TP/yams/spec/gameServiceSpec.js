import { searchComibination } from "../Services/gameService";

describe("GameService", function () {
  it("figures Yams", () => {
    const yams = [
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5],
    ];

    for (const dices of yams) {
      const { figure, numbers } = searchComibination(dices);
      const num = dices[0];

      console.log(figure, numbers);

      expect(figure === "yam" && numbers.pop() === num).toBe(true);
    }
  });

  it("figures square", () => {
    const squares = [
      [1, 1, 1, 1, 5],
      [2, 2, 2, 2, 5],
      [3, 3, 5, 3, 3],
      [4, 4, 4, 4, 5],
      [5, 5, 5, 5, 1],
      [6, 6, 6, 6, 1],
    ];

    for (const dices of squares) {
      const { figure, numbers } = searchComibination(dices);
      const num = dices[0];

      console.log(figure, numbers);

      expect(figure === "square" && numbers.pop() === num).toBe(true);
    }
  });
});
