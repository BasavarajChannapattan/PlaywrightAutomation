import {APIRequestContext} from "@playwright/test";
import {API_BASE, getTrelloParams, trelloHeaders} from "./helper_Common.spec";
export interface Board {
    id: string;
    name: string;
    idList: string;
}
export async function CreateBoard(request: APIRequestContext, boardName: string): Promise<Board> {
    const params = getTrelloParams({ name: boardName });
    const response = await request.post(`${API_BASE}/boards`, {
        params,
        headers: trelloHeaders,
    });

    if (!response.ok()) {
        throw new Error(`Failed to create board: ${await response.text()}`);
    }
    return response.json();
}

export async function CreateCard(request: APIRequestContext, cardName: string, cardIdList:string): Promise<Board> {
  const params = getTrelloParams({ name: cardName, idList:cardIdList});
  const response = await request.post(`${API_BASE}/cards`, {
      params,
      headers: trelloHeaders,
  })

    if(!response.ok()) {
        throw new Error(`Failed to create card ${await response.text()}`);
    }

    return response.json();
}


export async  function CreateCheckList(request: APIRequestContext, cardId:string, name:string, position:string): Promise<Board> {
    const params = getTrelloParams({ name: name, pos:position});
    const response = await request.post(`${API_BASE}/cards/${cardId}checklists`, {
      params,
        headers: trelloHeaders,
    })
    if(!response.ok()) {
        throw new Error(`Failed to create checkList ${await response.text()}`);
    }

    return response.json();
}