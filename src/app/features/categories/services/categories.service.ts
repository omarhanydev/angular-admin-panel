import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetchCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }
}
