import {APIRequestContext, expect, test} from "@playwright/test";
import {CreateBoard, CreateCard} from "../utils/helper_Post_Trello.spec";
import {getFieldOnCard, getSingleCard} from "../utils/helper_getTrello.spec";
import {createToDoList} from "../utils/helper_TodoBoard.spec";
import {DeleteBoard, DeleteCard} from "../utils/helper_DeleteTrello.spec";
import {updateCard} from "../utils/helper_PutTrello.spec";


test.describe("Create_Card E2E", async ()=>{
    let boardId:string;
    let cardId:string;
    let ToDoIdList:string;
    test.beforeAll("Create Board and Card in Trello", async ({request}) => {
        const boardName= "Testing_Card" + Date.now();
        const createBoard= await CreateBoard(request, boardName);

        expect(createBoard).toHaveProperty("id");
        expect(createBoard).toHaveProperty("name");
        expect(createBoard).toHaveProperty("name",boardName);
        boardId = createBoard.id;


        const listName = "In QA"
        const createTodlist = await createToDoList(request, boardId, listName);
        expect(createTodlist).toHaveProperty("id");
        expect(createTodlist).toHaveProperty("name");
        expect(createTodlist).toHaveProperty("idBoard");
        ToDoIdList = createTodlist.id

        const cardName= "Testing" + Date.now();
        const createCard= await CreateCard(request, cardName, ToDoIdList);
        expect(createCard).toHaveProperty("id");
        cardId = createCard.id;
    })

    test("Get single Card", async ({request}:{request:APIRequestContext}) => {
        const singleCard = await getSingleCard(request, cardId);
        expect(singleCard).toHaveProperty("id");
        expect(singleCard).toHaveProperty("id", cardId)
    })

    test("Update Card", async ({request}:{request:APIRequestContext}) => {
        const updateCardName = "Update Card" + Date.now();
        const updateName = await updateCard(request, cardId, updateCardName);

        expect(updateName).toHaveProperty("name", updateCardName);
    })

    test("Get field on a card", async ({request}:{request:APIRequestContext}) => {
        const getField = await getFieldOnCard(request, cardId);

        expect(getField).toHaveProperty("_value",boardId);
    })



    test.afterAll("Clean_Up", async ({request}) => {
        await DeleteCard(request,cardId);
        await DeleteBoard(request, boardId);
    })
})