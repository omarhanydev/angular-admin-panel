import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any[] = [];
  productsLoading: boolean = true;

  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  removeProduct(id: number) {
    return this.http.delete('https://fakestoreapi.com/products/' + id);
  }

  getProduct(id: number) {
    return this.http.get('https://fakestoreapi.com/products/' + id);
  }
}
