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
    return total;
  }

  return {
    addProduct,
    removeProduct, // ← ajouté ici
    getProductCount,
    getTotal,
  };
}
