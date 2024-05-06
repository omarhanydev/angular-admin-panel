import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'image',
    'title',
    'category',
    'rating',
    'price',
    'actions',
  ];
  filterForm: FormGroup;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.filterForm = this.formBuilder.group({
      title: [''],
      category: [''],
    });
  }

  get title(): FormControl {
    return <FormControl<any>>this.filterForm.get('title');
  }

  get category(): FormControl {
    return <FormControl<any>>this.filterForm.get('category');
  }

  ngOnInit() {
    this.reloadProducts();
    this.reloadCategories();
  }

  reloadProducts() {
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
  }
  reloadCategories() {
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

  openDeleteDialog(id: number, message: string) {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        message,
      },
    });
    deleteDialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.productsService.removeProduct(id).subscribe({
          next: (data: any) => {
            const message = data.title + ' - Deleted Successfully';
            this._snackBar.open(message, '', {
              duration: 1200,
            });
            this.reloadProducts();
            this.reloadCategories();
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
    });
  }

  get products(): any[] {
    return this.productsService.products;
  }

  get categories(): any[] {
    return this.categoriesService.categories;
  }

  get filteredProducts(): any[] {
    let products = this.productsService.products;
    if (this.title?.value) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(this.title?.value.toLowerCase()),
      );
    }
    if (this.category?.value && this.category?.value.length) {
      products = products.filter((p: any) => {
        if (this.category?.value.includes(p.category)) {
          return p;
        }
      });
    }
    return products;
  }

  get productsLoading(): boolean {
    return this.productsService.productsLoading;
  }
}
