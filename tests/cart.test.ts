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

  it("should increase quantity when adding an existing product", () => {
    const product: Product = {
      id: "p1",
      name: "Test Product",
      price: 10,
      quantity: 1,
    };

    cart.addProduct(product);
    cart.addProduct(product); // même produit ajouté deux fois

    expect(cart.getProductCount()).toBe(2);
    expect(cart.getTotal()).toBe(20);
  });

  it("should remove a product from the cart", () => {
    const product: Product = {
      id: "p1",
      name: "Product to remove",
      price: 15,
      quantity: 1,
    };
  
    cart.addProduct(product);
    expect(cart.getProductCount()).toBe(1);
  
    cart.removeProduct("p1");
  
    expect(cart.getProductCount()).toBe(0);
    expect(cart.getTotal()).toBe(0);
  });
  
});
