import { describe, expect, it, beforeEach } from "vitest";
import { createCart, Product } from "../src/cart";

describe("cart module", () => {
  let cart: ReturnType<typeof createCart>;

  beforeEach(() => {
    cart = createCart();
  });
  

  it("should add a product to the cart", () => {
    const product: Product = {
      id: "p1",
      name: "Test Product",
      price: 20,
      quantity: 2,
    };

    cart.addProduct(product);

    expect(cart.getProductCount()).toBe(2);
    expect(cart.getTotal()).toBe(40);
  });
});
