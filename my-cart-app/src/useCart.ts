import { useState } from "react";
import { createCart, Product } from "./cart";

export function useCart() {
  const [cartInstance] = useState(() => createCart());
  const [, forceUpdate] = useState({}); // Pour forcer un render

  const update = () => forceUpdate({});

  return {
    addProduct: (product: Product) => {
      cartInstance.addProduct(product);
      update();
    },
    removeProduct: (id: string) => {
      cartInstance.removeProduct(id);
      update();
    },
    getTotal: () => cartInstance.getTotal(),
    getProductCount: () => cartInstance.getProductCount(),
    applyDiscount: (code: string) => {
      cartInstance.applyDiscount(code);
      update();
    },
    cart: cartInstance,
  };
}
