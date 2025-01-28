import { Category } from './helpers_Common.spec';

function ProductRequest(): { validProductData: ProductData } {
    const title = "Test Product " + Date.now();
    const price = Number("123") + Math.floor(Math.random() * 1000);
    const description = "Test Description " + Date.now();
    const image = "https://i.pravatar.cc";
    const category = Category();

    const productData: ProductData = {
        title,
        price,
        description,
        image,
        category,
    };

    return { validProductData: productData };
}

interface ProductData {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export { ProductRequest };