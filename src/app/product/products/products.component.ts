import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/header/interfaces/product.interface';
import { productService } from '../../header/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  pageInit = true;
  products: Product[] = [];
  categories: Array<string> = [];
  categorie = '';
  page = 0;
  dat = 0;
  searche: string = '';
  spinnerService = inject(SpinnerService);
  category$ = this.productService.categoryObservable;
  category='';

  constructor(
    private productService: productService,
    private toaster: ToastrService
  ) {
    this.categorie = this.productService.Category;
  }

  ngOnInit() {
    this.productService.products
      .pipe(
        tap((response: Product[]) => {
          this.products = response;

          response.forEach(
            (product) =>
              (this.products[product.id - 1].title =
                product.title.toLowerCase())
          );

          this.category$
            .pipe(
              tap((category: string) => {
                if (category === '' )
                 return this.products


                if(category==='All'){
               
                   this.products=response
                   return this.products
                }

               
                  
                this.products = response.filter(
                  (products) => products.category === category
                );
                return [];
              })
            )
            .subscribe();
        })
      )
      .subscribe();

      this.productService.categories
      .pipe(
        tap((response: Array<string>) => {
          this.categories = response;
          this.categories.push('All')
          this.categories.reverse()
        })
      )
      .subscribe();
  }

  quantity$ = this.productService.quantityObservable;
  price$ = this.productService.priceObservable;

  addCartToClick(product: Product): void {
    this.productService.addToCart(product);
    this.toaster.success(` ${product.title} `, 'Added to card', {
      positionClass: 'toast-bottom-right',
      timeOut: 1200,
    });
  }

  increment(): void {
    this.page += 6;
    this.pageInit = false;
  }

  decrement(): void {
    if (this.page > 0) {
      this.page -= 6;
      this.pageInit = false;
    }
    if (this.page == 0) {
      this.pageInit = true;
    }
  }

  searchProducts(search: string) {
    console.log(search);

    this.searche = search;
  }

  filterCategory(category: string) {
    this.categorie = category;
  }

  goToProducts() {
    window.location.reload();
  }

  cambio(category: string) {
    
    this.category=category
    console.log(category);
    
    this.productService.setObservable(category)
  }
}
