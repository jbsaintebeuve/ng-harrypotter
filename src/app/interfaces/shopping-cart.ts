export interface ShoppingCart {
  total_price: number;
  stock: ShoppingCartProduct[];
}

export interface ShoppingCartProduct {
  id: string;
  quantity: number;
}
