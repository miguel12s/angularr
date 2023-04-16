import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { DescripcionComponent } from '../descripcion/descripcion.component';
import { Product } from '../header/interfaces/product.interface';
import { rateCount } from '../header/interfaces/rate.interface';
import { productService } from '../header/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductComponent  {
  @Input() product!:Product;
  numberOfStars: number[] = [];
  @Output() addCartToClic = new EventEmitter<Product>();
  products: Product[] = [];


 

  constructor(
    private descriptionComponent: DescripcionComponent
  ) {
    
  }



  paintStars(star: number): number[] {
    this.numberOfStars = this.descriptionComponent.paintStars(star);

    return this.numberOfStars;
  }

  addCartToClick(product: Product): void {
    this.addCartToClic.emit(product);
  
   
  }

  // products:any = [];
  // constructor(private productService: productService) {}

  // ngOnInit() {
  //   console.log('entras a product');

  //   this.productService.products.pipe(tap((data: Product[]) => (this.products = data)))
  //     .subscribe();

  // }

  // addCartToClick(product:Product):void{
  //   console.log('producto agregado');

  //  this.productService.addToCart(product)
  // }
}
