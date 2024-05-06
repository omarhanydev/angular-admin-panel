import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  removeProduct(id: number) {
    return this.http.delete('https://fakestoreapi.com/products/' + id);
  }

  fetchProduct(id: number) {
    return this.http.get('https://fakestoreapi.com/products/' + id);
  }

  addProduct(data: any) {
    return this.http.post('https://fakestoreapi.com/products/', data);
  }

  editProduct(id: number, data: any) {
    return this.http.put('https://fakestoreapi.com/products/' + id, data);
  }
}
