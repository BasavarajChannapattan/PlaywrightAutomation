import {APIRequestContext, expect, test} from "@playwright/test";
import {CreateBoard, CreateCard, CreateCheckList} from "../utils/helper_Post_Trello.spec";
import {getFieldOnCard, getSingleCard} from "../utils/helper_getTrello.spec";
import {createToDoList} from "../utils/helper_TodoBoard.spec";
import {DeleteBoard, DeleteCard} from "../utils/helper_DeleteTrello.spec";
import {updateCard} from "../utils/helper_PutTrello.spec";


test.describe("Create_Card E2E", async ()=>{
    let boardId:string;
    let cardId:string;
    let ToDoIdList:string;
    let checkList:string;
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

        const checkListName = "Bug Raised" + Date.now();
         const CheckList = await CreateCheckList(request, cardId, checkListName,"top");
         expect(CheckList).toHaveProperty("id");
         checkList = CheckList.id
    })

    test("Get checkList", async ({request})=>{

    })



    test.afterAll("Clean_Up", async ({request}) => {
        await DeleteCard(request,cardId);
        await DeleteBoard(request, boardId);
    })
})
