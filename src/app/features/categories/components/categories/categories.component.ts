import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  displayedColumns: string[] = ['title', 'actions'];
  filterForm: FormGroup;
  categories: any[] = [];
  categoriesLoading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.filterForm = this.formBuilder.group({
      title: [''],
    });
  }

  get title(): FormControl {
    return <FormControl<any>>this.filterForm.get('title');
  }

  ngOnInit() {
    this.reloadCategories();
  }

  reloadCategories() {
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

  get filteredCategories(): any[] {
    let categories = this.categories;
    if (this.title?.value) {
      categories = categories.filter((p) =>
        p.toLowerCase().includes(this.title?.value.toLowerCase()),
      );
    }
    return categories;
  }
}
