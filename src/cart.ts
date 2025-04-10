import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export type Product = z.infer<typeof ProductSchema>;

export function createCart() {
  const items = new Map<string, Product>();

  // Taux de remise appliqué (par défaut : 0)
  let discountRate = 0;

  // Codes promo disponibles
  const discountCodes: Record<string, number> = {
    PROMO10: 0.1,
    PROMO20: 0.2,
    PROMO50: 0.5,
  };

  function addProduct(product: Product) {
    ProductSchema.parse(product);

    const existing = items.get(product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      items.set(product.id, { ...product });
    }
  }

  function removeProduct(productId: string) {
    items.delete(productId);
  }

  function getProductCount() {
    let count = 0;
    for (const item of items.values()) {
      count += item.quantity;
    }
    return count;
  }

  function getTotal() {
    let total = 0;
    for (const item of items.values()) {
      total += item.price * item.quantity;
    }
    return total * (1 - discountRate);
  }

  function applyDiscount(code: string) {
    if (!discountCodes[code]) {
      throw new Error("Invalid discount code");
    }
    discountRate = discountCodes[code];
  }

  return {
    addProduct,
    removeProduct,
    getProductCount,
    getTotal,
    applyDiscount,
  };
}
