"use strict";

import { all  } from "../Model.js";

export const indexController = (req, res) => {

    all().then(
        collection => {
            console.log(collection);
            res.render("pages/index", { data : collection , title: process.env.TITLE ?? "No Title" })
        }
    )

    
};
