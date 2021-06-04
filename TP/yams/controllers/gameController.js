"use strict";

import { all, saveCombination } from "../Model.js";

import { createCombination, searchComibination } from "../Services/gameService";

import config from "../config";

const { APP_TITLE } = config();

export const index = (req, res) => {
  const { dices, date } = req.session;

  // écraser les cookies
  // req.session.dices = null;
  // req.session.date = null;

  all().then((collection) => {
    res.render("pages/index", {
      data: collection,
      title: `${ APP_TITLE ?? "No Title"}  ${date}`,
      dices: dices ?? [1, 1, 1, 1, 1],
    });
  });
};

export const play = async (req, res, next) => {
  req.session.dices = createCombination();
  req.session.date = new Date();

  res.redirect("/"); // page principale
};
