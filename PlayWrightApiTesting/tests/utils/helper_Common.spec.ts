import * as dotenv from "dotenv";
dotenv.config();

export const API_BASE = "/1";

export const getTrelloParams = (extraParams: Record<string, string> = {}) => ({
    key: process.env.TRELLO_KEY as string,
    token: process.env.TRELLO_TOKEN as string,
    ...extraParams,
});

export const trelloHeaders = {
    Cookie: process.env.TRELLO_COOKIE as string,
};

const boardName= "Test Board" + Date.now();