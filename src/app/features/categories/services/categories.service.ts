import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: any[] = [];
  categoriesLoading: boolean = true;

  constructor(private http: HttpClient) {}

  fetchCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }
}
