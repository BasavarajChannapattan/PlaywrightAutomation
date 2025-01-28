import {APIResponse, expect} from "@playwright/test";

export function Category(): string {
    const categories = [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Health & Beauty",
        "Sports & Outdoors",
        "Books & Stationery",
        "Toys & Games",
        "Automotive",
        "Groceries",
        "Baby Products",
        "Furniture",
        "Jewelry & Accessories",
        "Pet Supplies",
        "Musical Instruments",
        "Office Supplies",
        "Garden & Outdoors",
        "Travel & Luggage",
        "Footwear",
        "Mobile Phones & Accessories",
        "Watches"
    ];
    return categories[Math.floor(Math.random() * categories.length)];
}

export async function verifyStatusCode(res: APIResponse, expectedStatusCode: number) {
    console.log(res); // Add this to inspect the response object
    const statusCode = res.status();  // Ensure that res is an instance of APIResponse
    if (statusCode !== expectedStatusCode) {
        console.error(`Response text: ${await res.text()}`);
        console.error(`Actual status: ${statusCode}`);
        expect(statusCode).toBe(expectedStatusCode);
    }
}


