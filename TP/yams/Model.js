"use strict";

import { run } from "./connect";

export const all = async () => {
    const collection = await run();
    
    return collection.find({}, { name : 1, number : 1, order : 1, _id : 0}).toArray();
};

export const saveCombination = async ({ date, combinations, figure }) => {
    const collection = await run();

    collection.insertOne({
        date,
        combinations,
        figure
    });
};