interface Produit {
  id: number;
  quantite: number;
}

export interface ShoppingCart {
  total_price: number;
  stock: Produit[];
}
