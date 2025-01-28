import{APIRequestContext} from "@playwright/test";
import {Board} from "./helper_CreateBoard.spec";
import {request} from "node:http";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";


export interface TodoList {
    idBoard: string;
}

export async function createToDoList(
    request: APIRequestContext,
    boardId: string,
    listName: string
): Promise<any> {
    const params = getTrelloParams({ name: listName, idBoard: boardId });
    const response = await request.post(`${API_BASE}/lists`, {
        params,
        headers: trelloHeaders,
    });

    if (!response.ok()) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch boards: ${errorMessage}`);
    }

    return response.json();
}
