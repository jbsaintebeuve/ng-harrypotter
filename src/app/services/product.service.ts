import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    this.getFav(); // Initialize favorites on service creation
  }

  fetchProducts() {
    this.http
      .get(
        'https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1%20TO%20150]',
      )
      .subscribe((data: any) => {
        console.log(data.data);
      });
  }

  getProducts() {
    return this.products;
  }
  getProduct(id: number) {
    return this.products.find((p) => p.id === id);
  }

  addProduct(id: number) {
    this.products[id];
  }

  private favSubject = new BehaviorSubject<number[]>([0]);
  fav$ = this.favSubject.asObservable();

  fav: number[] = [];
  static cart$: any;

  getFav(): number[] {
    const storedFav = localStorage.getItem('ng-hp-fav');
    if (storedFav) {
      this.fav = JSON.parse(storedFav);
      this.editFav();
    } else {
      this.fav = [];
    }
    this.favSubject.next(this.fav);
    return this.fav;
  }

  getFavoriteCount(): number {
    return this.getFav().length;
  }
  private updateFav() {
    localStorage.setItem('ng-hp-fav', JSON.stringify(this.fav));
    this.favSubject.next({ ...this.fav });
  }

  addToFav(product: Product) {
    const storedFav = localStorage.getItem('ng-hp-fav');
    if (storedFav) {
      this.fav = JSON.parse(storedFav);
    }

    const existingProduct = this.fav.find((f) => f === product.id);
    product.isFavorite = !product.isFavorite;
    if (existingProduct) {
      this.fav = this.fav.filter((f) => f !== product.id);
    } else {
      this.fav.push(product.id);
    }

    this.updateFav();
  }

  removeFromFav(productId: number): number[] {
    this.fav = this.fav.filter((p: number) => p !== productId);
    localStorage.setItem('ng-hp-fav', JSON.stringify(this.fav));
    this.updateFav();
    return this.fav;
  }
  isFavorite(productId: number): boolean {
    return this.fav.includes(productId);
  }

  clearFav(): number[] {
    this.fav = [];
    localStorage.setItem('ng-hp-fav', JSON.stringify(this.fav));
    this.updateFav();
    return this.fav;
  }

  editFav() {
    this.products.forEach((product) => {
      if (this.fav.includes(product.id)) {
        product.isFavorite = true;
      }
    });
  }
}
