import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent {
  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  productLoading: boolean = true;
  product: Product = {
    id: 0,
    title: '',
    category: '',
    description: '',
    image: '',
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
  };

  ngOnInit() {
    this.productLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.productsService.fetchProduct(id).subscribe({
        next: (data: any) => {
          if (data) {
            this.productLoading = false;
            this.product = data;
          } else {
            this.router.navigate(['404']);
          }
        },
        error: (response: HttpErrorResponse) => {
          const message = response.error
            ? String(response.error).charAt(0).toUpperCase() +
              String(response.error).slice(1)
            : null;
          if (message) {
            this.snackBar.open(message, '', {
              duration: 1200,
            });
          }
        },
      });
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
            this.snackBar.open(message, '', {
              duration: 1200,
            });
            this.router.navigate(['/products']);
          },
          error: (response: HttpErrorResponse) => {
            const message = response.error
              ? String(response.error).charAt(0).toUpperCase() +
                String(response.error).slice(1)
              : null;
            if (message) {
              this.snackBar.open(message, '', {
                duration: 1200,
              });
            }
          },
        });
      }
    });
  }
}
