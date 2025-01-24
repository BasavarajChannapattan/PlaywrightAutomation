import {test, expect, APIRequestContext} from "@playwright/test";
import {CreateBoard} from "./utils/helper_CreateBoard.spec";
import {getSingleBoard} from "./utils/helper_getBoard.spec";
import {DeleteBoard} from "./utils/helper_DeleteBoard.spec";


test.describe("create_board", async () => {
    let boardId;
    test.beforeAll("Create Board in Trello", async ({request}) => {
        const boardName= "Test Board " + Date.now();
        const createBoard= await CreateBoard(request, boardName);

        expect(createBoard).toHaveProperty("id");
        expect(createBoard).toHaveProperty("name");
        expect(createBoard).toHaveProperty("name",boardName);
        boardId = createBoard.id;
    })

    test("Get single board", async ({request}:{request:APIRequestContext}) => {
        const singleBoards = await getSingleBoard(request, boardId);
        expect(singleBoards).toHaveProperty("id");
        expect(singleBoards).toHaveProperty("id", boardId)
    })

    test("Delete board", async ({request}) => {
       const deleteBoard= await DeleteBoard(request, boardId);
       expect(deleteBoard).toHaveProperty("_value", null);
    })
})