import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss'],
})
export class CategoriesViewComponent {
  constructor(
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {}

  title: string = '';
  categoryLoading: boolean = true;
  category: Product[] = [];
  displayedColumns: string[] = [
    'image',
    'title',
    'category',
    'rating',
    'price',
  ];

  ngOnInit() {
    this.categoryLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      const name = params['name'];
      this.title = name;
      this.categoriesService.fetchCategory(name).subscribe({
        next: (data: any) => {
          this.categoryLoading = false;
          this.category = data;
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
    });
  }
}
