import {test, expect, APIRequestContext} from "@playwright/test";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";
import * as dotenv from "dotenv";
dotenv.config();


//Interface
export interface Board{
    id:string;
    name:string;
    [key:string]:any;
}

export async function getAllBoards(request:APIRequestContext): Promise<Board> {
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

export async function getSingleCard(request:APIRequestContext,cardId:string):Promise<Board> {
    const response = await request.get(`${API_BASE}/cards/${cardId}`,{
         params:getTrelloParams(),
        headers: trelloHeaders,
    })

    if(!response.ok()) {
        throw new Error(`Failed to fetch cards: ${response.status()}`);
    }
    return response.json();
}

export async function getFieldOnCard(request:APIRequestContext,cardId:string):Promise<Board> {
    const field = "idBoard"
    const response = await request.get(`${API_BASE}/cards/${cardId}/${field}`,{
        params:getTrelloParams(),
        headers: trelloHeaders,
    })

    if(!response.ok()) {
        throw new Error(`Failed to fetch cards: ${response.status()}`);
    }
    return response.json();
}


export async function getAttachment(request:APIRequestContext,cardId:string, attachmentId:string):Promise<Board> {
    const response = await request.get(`${API_BASE}/cards/${cardId}/attachments/${attachmentId}`,{
        params:getTrelloParams(),
        headers: trelloHeaders,
    })

    if(!response.ok()) {
        throw new Error(`Failed to fetch attachments: ${response.status()}`);
    }
    return response.json();
}

