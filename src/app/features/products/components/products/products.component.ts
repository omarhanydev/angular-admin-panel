import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';

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

  constructor(
    private productsService: ProductsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.reloadProducts();
  }

  reloadProducts() {
    this.productsService.productsLoading = true;
    this.productsService.fetchProducts().subscribe({
      next: (data: any) => {
        this.productsService.products = data;
        console.log(data);
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

  get productsLoading(): boolean {
    return this.productsService.productsLoading;
  }
}
