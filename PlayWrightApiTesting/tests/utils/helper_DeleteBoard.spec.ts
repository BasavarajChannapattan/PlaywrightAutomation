import {APIRequestContext, errors} from "@playwright/test";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";
export interface Board {
    id: string;
    name: string;
}

export async function DeleteBoard(request:APIRequestContext, boardId: string): Promise<void> {
    const params = getTrelloParams()
    const response = await request.delete(API_BASE + "/boards/" + boardId, {
        params,
        headers:trelloHeaders
    })

    if (!response.ok) {
        throw new Error(`Failed to create board: ${response.status()}`);
    }
    return response.json();

}