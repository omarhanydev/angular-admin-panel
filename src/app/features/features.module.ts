import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [DashboardComponent, ProductsComponent, CategoriesComponent],
  imports: [CommonModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
