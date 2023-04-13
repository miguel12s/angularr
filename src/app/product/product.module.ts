import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DescripcionComponent } from '../descripcion/descripcion.component';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductsComponent } from './products/products.component';
import {MatSelectModule} from '@angular/material/select'
import {  NgxSpinnerModule } from 'ngx-spinner';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { FiltroPipe } from './pipe/filtro.pipe';



@NgModule({
  declarations: [
ProductComponent, ProductsComponent, PaginacionComponent, FiltroPipe
  ],
  imports: [
    ProductRoutingModule,MatCardModule,MatInputModule,MatIconModule,MatButtonModule,CommonModule,MatSelectModule,NgxSpinnerModule
  ],
  
  providers:[DescripcionComponent]  
})
export class ProductModule { }
