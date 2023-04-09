import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DescriptionModule } from './descripcion/description.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { ProductModule } from './product/product.module';
import { CartComponent } from './cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './product/services/interceptor.service';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { MatOptionModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActualizarModule } from './actualizar/actualizar.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent,CartComponent,ActualizarComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DescriptionModule,
    MatToolbarModule,
    FormsModule,
    ProductModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot(),MatOptionModule,MatSelectModule,ActualizarModule

  ],
  

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
