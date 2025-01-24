import {test, expect, APIRequestContext} from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const API_BASE="/1";

//Interface
export interface Board{
    id:string;
    name:string;
    [key:string]:any;
}

export async function getAllBoards(request:APIRequestContext): Promise<Board[]> {
    const response = await request.get(`${API_BASE}/members/me/boards`, {
        params: {
            key: process.env.TRELLO_KEY as string,
            token: process.env.TRELLO_TOKEN as string,
        },
        headers: {
            Cookie: process.env.TRELLO_COOKIE as string,
        },
    });
    if (!response.ok()) {
        throw new Error(`Failed to fetch boards: ${response.status()}`);
    }
    return response.json();
}

export async function getSingleBoard(request:APIRequestContext,boardId:string):Promise<Board> {
    const response = await request.get(`${API_BASE}/boards/${boardId}`,{
        params: {
            key: process.env.TRELLO_KEY as string,
            token: process.env.TRELLO_TOKEN as string,
        },
        headers: {
            Cookie: process.env.TRELLO_COOKIE as string,
        },
    });

    if(!response.ok()) {
        throw new Error(`Failed to fetch boards: ${response.status()}`);
    }
     return response.json();
}
