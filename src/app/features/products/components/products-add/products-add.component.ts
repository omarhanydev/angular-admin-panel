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
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss'],
})
export class ProductsAddComponent {
  addForm: FormGroup;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      image: [''],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
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
    return <FormControl<any>>this.addForm.get('title');
  }

  get price(): FormControl {
    return <FormControl<any>>this.addForm.get('price');
  }

  get description(): FormControl {
    return <FormControl<any>>this.addForm.get('description');
  }

  get image(): FormControl {
    return <FormControl<any>>this.addForm.get('image');
  }

  get category(): FormControl {
    return <FormControl<any>>this.addForm.get('category');
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const data = {
        title: this.title?.value,
        category: this.category?.value,
        price: this.price?.value,
        image: this.image?.value,
        description: this.description?.value,
      };
      this.productsService.addProduct(data).subscribe({
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
    }
  }
}
