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
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.productsService.productsLoading = true;
    this.productsService.fetchProducts().subscribe({
      next: (data: any) => {
        this.productsService.products = data;
        this.productsService.productsLoading = false;
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
    this.categoriesService.categoriesLoading = true;
    this.categoriesService.fetchCategories().subscribe({
      next: (data: any) => {
        this.categoriesService.categories = data;
        this.categoriesService.categoriesLoading = false;
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

  get products(): any[] {
    return this.productsService.products;
  }

  get productsLoading(): boolean {
    return this.productsService.productsLoading;
  }

  get categories(): any[] {
    return this.categoriesService.categories;
  }

  get categoriesLoading(): boolean {
    return this.categoriesService.categoriesLoading;
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
