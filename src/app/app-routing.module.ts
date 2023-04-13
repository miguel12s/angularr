import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'products/:page',loadChildren:()=>import('./product/product.module').then(m=>m.ProductModule)},
  {path:'products/actualizar/:id',loadChildren:()=>import('./actualizar/actualizar.module').then (m=>m.ActualizarModule)},
  {path:'description',loadChildren:()=>import('./descripcion/description.module').then (m=>m.DescriptionModule)},
 
  {path:'',redirectTo:'products/1',pathMatch:'full'},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
