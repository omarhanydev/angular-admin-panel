import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../products/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from '../categories/services/categories.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  products: any[] = [];
  productsLoading: boolean = true;
  categories: any[] = [];
  categoriesLoading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.productsLoading = true;
    this.productsService.fetchProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.productsLoading = false;
      },
      error: (response: HttpErrorResponse) => {
        const message = response.error
          ? String(response.error).charAt(0).toUpperCase() +
            String(response.error).slice(1)
          : null;
        if (message) {
          this._snackBar.open(message, '', {
            duration: 1200,
          });
        }
      },
    });
    this.categoriesLoading = true;
    this.categoriesService.fetchCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.categoriesLoading = false;
      },
      error: (response: HttpErrorResponse) => {
        const message = response.error
          ? String(response.error).charAt(0).toUpperCase() +
            String(response.error).slice(1)
          : null;
        if (message) {
          this._snackBar.open(message, '', {
            duration: 1200,
          });
        }
      },
    });
  }

  get currentDate(): string {
    return new Date().toLocaleString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get currentDay(): string {
    return new Date().toLocaleString('en-us', { weekday: 'long' });
  }
}
