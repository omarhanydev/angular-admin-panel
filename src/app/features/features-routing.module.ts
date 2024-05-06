import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/components/products/products.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { ProductsAddComponent } from './products/components/products-add/products-add.component';
import { ProductsViewComponent } from './products/components/products-view/products-view.component';
import { ProductsEditComponent } from './products/components/products-edit/products-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/add',
    component: ProductsAddComponent,
  },
  {
    path: 'products/:id',
    component: ProductsViewComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductsEditComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
