import {expect, test} from "@playwright/test"
import {ProductRequest} from "../helpers/helper_Product.spec";
import {beforeEach} from "node:test";


test.describe.serial("Perform E2E Test", async()=>{
    test("Create products", async ({ request }) => {
        const payload = ProductRequest();
        const createRequest = await request.post("/products", {
            data: payload.validProductData,
        });
        const responseBody = await createRequest.json();
        expect(responseBody).toHaveProperty("id");
        expect(responseBody).toHaveProperty("title");
        expect(responseBody).toHaveProperty("price");
        expect(responseBody).toHaveProperty("category");
        expect(responseBody).toHaveProperty("description");
        console.log(responseBody);
    });

    test("Get single product", async ({ request }) => {
        const getRequest = await request.get("/products/1");
        const response = await getRequest.json();
        console.log(response);
        expect(response).toHaveProperty("id");
        expect(response).toHaveProperty("title");
        expect(response).toHaveProperty("price");
        expect(response).toHaveProperty("category");
        expect(response).toHaveProperty("description");

    })

    test("Fetch the all products", async ({request}) => {
        const getRequest = await request.get("/products");
        const response = await getRequest.json();
        response.forEach(product => {
            if(product.hasOwnProperty("id")) {
                expect(product).toHaveProperty("id")
                expect(product).toHaveProperty("title")
                expect(product).toHaveProperty("price")
                expect(product).toHaveProperty("description")
                expect(product).toHaveProperty("category")
                expect(product).toHaveProperty("image")
            }
        })
    })
})
