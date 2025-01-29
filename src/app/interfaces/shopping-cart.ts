export interface ShoppingCart {
  total_price: number;
  stock: ShoppingCartProduct[];
}

export interface ShoppingCartProduct {
  id: number;
  quantity: number;
}
