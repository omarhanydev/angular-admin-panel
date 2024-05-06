import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/components/products/products.component';
import { CategoriesComponent } from './categories/components/categories/categories.component';
import { ProductsAddComponent } from './products/components/products-add/products-add.component';
import { ProductsViewComponent } from './products/components/products-view/products-view.component';
import { ProductsEditComponent } from './products/components/products-edit/products-edit.component';
import { CategoriesViewComponent } from './categories/components/categories-view/categories-view.component';

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
  {
    path: 'categories/:name',
    component: CategoriesViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
