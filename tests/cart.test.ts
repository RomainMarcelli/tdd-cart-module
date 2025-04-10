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

  it("should do nothing when trying to remove a non-existing product", () => {
    const product: Product = {
      id: "p1",
      name: "Only Product",
      price: 20,
      quantity: 1,
    };
  
    cart.addProduct(product);
    cart.removeProduct("does-not-exist");
  
    expect(cart.getProductCount()).toBe(1);
    expect(cart.getTotal()).toBe(20);
  });

  
  it("should throw an error if product has negative price", () => {
    const invalidProduct = {
      id: "p-invalid-1",
      name: "Bad Price Product",
      price: -10,
      quantity: 1,
    };
  
    
    expect(() => cart.addProduct(invalidProduct)).toThrow();
  });
  
  it("should throw an error if product has quantity 0", () => {
    const invalidProduct = {
      id: "p-invalid-2",
      name: "Zero Quantity Product",
      price: 10,
      quantity: 0,
    };
  
    
    expect(() => cart.addProduct(invalidProduct)).toThrow();
  });
  
  
  
});
