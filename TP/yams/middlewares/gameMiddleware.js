"use strict";

import { game as run } from "../Services/gameService";

export default (req, res, next) => {
  const { thow_dices } = req.query;

  req.session = {
    dices: [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ],
    lancer: thow_dices ? run() : [1, 1, 1, 1, 1],
  };

  next();
};
