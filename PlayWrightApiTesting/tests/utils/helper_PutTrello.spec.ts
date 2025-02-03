import {APIRequestContext} from "@playwright/test";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";
export interface Board {
    id: string;
    name: string;
    idList: string;
}


export async function updateCard(request: APIRequestContext, cardId:string ,updateName:string): Promise<Board> {
    const params = getTrelloParams();
    const response = await request.put(`${API_BASE}/cards/${cardId}`, {
        params,
        headers: trelloHeaders,
        data:{
            name: updateName,
        }
    })

    if(!response.ok){
        throw new Error("Failed to update card with id '"+updateName+"'");
    }

    return response.json();
}