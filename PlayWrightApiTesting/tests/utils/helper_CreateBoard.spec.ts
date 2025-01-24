import {APIRequestContext} from "@playwright/test";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";
export interface Board {
    id: string;
    name: string;
}
export async function CreateBoard(request: APIRequestContext, boardName: string): Promise<Board> {
    const params = getTrelloParams({ name: boardName });
    const response = await request.post(`${API_BASE}/boards`, {
        params,
        headers: trelloHeaders,
    });

    if (!response.ok()) {
        throw new Error(`Failed to create board: ${response.status()}`);
    }
    return response.json();
}
