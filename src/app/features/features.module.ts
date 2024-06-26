import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppFormsModule } from '../forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/components/products/products.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { ProductsAddComponent } from './products/components/products-add/products-add.component';
import { ProductsViewComponent } from './products/components/products-view/products-view.component';
import { ProductsEditComponent } from './products/components/products-edit/products-edit.component';
import { CategoriesViewComponent } from './categories/components/categories-view/categories-view.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    CategoriesViewComponent,
    ProductsAddComponent,
    ProductsViewComponent,
    ProductsEditComponent,
    DeleteDialogComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    AppFormsModule,
    ReactiveFormsModule,
  ],
})
export class FeaturesModule {}
