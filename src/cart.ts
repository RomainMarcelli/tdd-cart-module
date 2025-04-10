import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),     // interdit les prix négatifs
  quantity: z.number().int().positive(), // interdit les quantités 0 ou négatives
});

export type Product = z.infer<typeof ProductSchema>;

// On va exposer une fonction pour créer un panier
export function createCart() {
  // ici, on retourne les méthodes du module cart (que l'on ajoutera plus tard)
  return {};
}
