import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = [
    <Product>{
      id: 0,
      name: 'Harry Potter',
      isFavorite: false,
      createdDate: new Date(1980, 6, 31),
      price: 100,
    },
    <Product>{
      id: 1,
      name: 'Ronnald Weasley',
      isFavorite: false,
      createdDate: new Date(1980, 3, 1),
      price: 80,
    },
    <Product>{
      id: 2,
      name: 'Hermione Granger',
      isFavorite: false,
      createdDate: new Date(1979, 8, 19),
      price: 90,
    },
    <Product>{
      id: 3,
      name: 'Neville Londubas',
      isFavorite: false,
      createdDate: new Date(1980, 7, 30),
      price: 70,
    },
    <Product>{
      id: 4,
      name: 'Albus Dumbledore',
      isFavorite: false,
      createdDate: new Date(1881, 7, 30),
      price: 150,
    },
    {
      id: 5,
      name: 'Severus Snape',
      isFavorite: false,
      createdDate: new Date(1960, 1, 9),
      price: 120,
    },
    <Product>{
      id: 6,
      name: 'Draco Malfoy',
      isFavorite: false,
      createdDate: new Date(1980, 5, 5),
      price: 85,
    },
    <Product>{
      id: 7,
      name: 'Luna Lovegood',
      isFavorite: false,
      createdDate: new Date(1981, 2, 13),
      price: 75,
    },
    <Product>{
      id: 8,
      name: 'Ginny Weasley',
      isFavorite: false,
      createdDate: new Date(1981, 7, 11),
      price: 70,
    },
    <Product>{
      id: 9,
      name: 'Fred Weasley',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
      price: 75,
    },
    <Product>{
      id: 10,
      name: 'George Weasley',
      isFavorite: false,
      createdDate: new Date(1978, 3, 1),
      price: 75,
    },
    <Product>{
      id: 11,
      name: 'Minerva McGonagall',
      isFavorite: false,
      createdDate: new Date(1935, 9, 4),
      price: 130,
    },
    <Product>{
      id: 12,
      name: 'Hagrid',
      isFavorite: false,
      createdDate: new Date(1928, 11, 6),
      price: 110,
    },
    <Product>{
      id: 13,
      name: 'Sirius Black',
      isFavorite: false,
      createdDate: new Date(1960, 10, 11),
      price: 95,
    },
    <Product>{
      id: 14,
      name: 'Remus Lupin',
      isFavorite: false,
      createdDate: new Date(1960, 2, 10),
      price: 90,
    },
  ];

  getProducts() {
    return this.products;
  }

  addProduct(id: number) {
    this.products[id];
  }

  switchFav(product: Product) {
    product.isFavorite = !product.isFavorite;
  }

  getFavoriteCount(): number {
    return this.products.filter((p) => p.isFavorite).length;
  }
  totalShoppingCart(list: number[]): number {
    let total = 0;
    for (const i of list) {
      total += this.products[i].price;
    }
    return total; 
  }

  clearFavorites(): void {
    this.products.forEach((product) => {
      product.isFavorite = false;
    });
  }
}
