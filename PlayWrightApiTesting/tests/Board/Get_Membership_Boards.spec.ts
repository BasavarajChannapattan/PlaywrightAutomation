import {test, expect, APIRequestContext} from "@playwright/test";
import {getAllBoards, getSingleBoard} from "../utils/helper_getTrello.spec";

test.describe("get_membership_Boards", () => {
    let userId:string;
    test.beforeAll(async ({request}:{request:APIRequestContext}) => {
        const boards= await getAllBoards(request)
        expect(boards).toHaveLength(70);
        expect(boards[0]).toHaveProperty("id");
        userId = boards[0].id;
    })

    test("Get single board", async ({request}:{request:APIRequestContext}) => {
        const singleBoards = await getSingleBoard(request, userId);
        expect(singleBoards).toHaveProperty("id");
        expect(singleBoards).toHaveProperty("id", userId)
    })
})