import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../categories/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent {
  id: number = 0;
  product: any = {};
  productLoading: boolean = true;
  editForm: FormGroup;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      image: [''],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.id = Number(id);
      this.productsService.fetchProduct(id).subscribe({
        next: (data) => {
          if (data) {
            this.productLoading = false;
            this.product = data;
            delete this.product.id;
            delete this.product.rating;
            this.editForm.setValue(this.product);
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
    this.categoriesService.fetchCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
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

  get title(): FormControl {
    return <FormControl<any>>this.editForm.get('title');
  }

  get price(): FormControl {
    return <FormControl<any>>this.editForm.get('price');
  }

  get description(): FormControl {
    return <FormControl<any>>this.editForm.get('description');
  }

  get image(): FormControl {
    return <FormControl<any>>this.editForm.get('image');
  }

  get category(): FormControl {
    return <FormControl<any>>this.editForm.get('category');
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const data: any = {};
      Object.keys(this.product).forEach((key) => {
        if (this.product[key] != this.editForm.get(key)?.value) {
          data[key] = this.editForm.get(key)?.value;
        }
      });
      if (Object.keys(data).length) {
        this.productsService.editProduct(this.id, data).subscribe({
          next: (data) => {
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
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
