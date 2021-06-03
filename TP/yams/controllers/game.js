import { all  } from "../Model.js";

export const indexController = (req, res) => {

    all().then(
        collection => {
            res.render("pages/index", { collection , title: process.env.TITLE ?? "No Title" })
        }
    )

    
};
