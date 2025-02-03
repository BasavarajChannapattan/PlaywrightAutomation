import {test, expect, APIRequestContext} from "@playwright/test";
import {CreateBoard} from "../utils/helper_Post_Trello.spec";
import {getSingleBoard} from "../utils/helper_getTrello.spec";
import {DeleteBoard} from "../utils/helper_DeleteTrello.spec";
import {createToDoList} from "../utils/helper_TodoBoard.spec";

let boardId;
test.describe("Create TodoList", async () => {
    test.beforeAll("Create Board in Trello", async ({request}) => {
        const boardName = "Basava" + Date.now();
        const createBoard = await CreateBoard(request, boardName);

        expect(createBoard).toHaveProperty("id");
        expect(createBoard).toHaveProperty("name");
        expect(createBoard).toHaveProperty("name", boardName);
        expect(createBoard).not.toHaveProperty("idBoard");
        boardId = createBoard.id;
    })

    test("Get single board", async ({request}:{request:APIRequestContext}) => {
        const singleBoards = await getSingleBoard(request, boardId);
        expect(singleBoards).toHaveProperty("id");
        expect(singleBoards).toHaveProperty("id", boardId)
    })

    test("It should create the Todo list for the current board", async ({request}: { request: APIRequestContext; }) => {
        const createTodlist = await createToDoList(request, boardId, "DONE");

        expect(createTodlist).toHaveProperty("id");
        expect(createTodlist).toHaveProperty("name");
        expect(createTodlist).toHaveProperty("idBoard");
    });

    test("Delete board", async ({request}:{request:APIRequestContext}) => {
        const deleteBoard= await DeleteBoard(request, boardId);
        expect(deleteBoard).toHaveProperty("_value", null);
    })
});