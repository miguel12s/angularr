import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarRoutingModule } from './actualizar-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { AppModule } from '../app.module';
import { InterceptorService } from '../product/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,ActualizarRoutingModule,MatSelectModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}]
})
export class ActualizarModule { }
