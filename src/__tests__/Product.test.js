import React from "react";
import { create } from "react-test-renderer";
import Product from "../components/Product";
const products = [
    {
        id: 12,
        sku: 12064273040195392,
        title: "Cat Tee Black T-Shirt",
        description: "4 MSL",
        availableSizes: ["S", "XS"],
        style: "Black with custom print",
        quantity: 1,
        price: 10.9,
        installments: 9,
        currencyId: "USD",
        currencyFormat: "$",
        isFreeShipping: true,
        image: "../assets/images/products/12064273040195392_1.jpg"
    }
];

it("Should match a snapshot of Product", () => {
    let product = create(<Product products={products} />);
    expect(product.toJSON()).toMatchSnapshot();
});
