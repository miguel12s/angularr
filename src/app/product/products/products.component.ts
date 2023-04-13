import { Component, inject,OnInit ,ChangeDetectorRef} from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/header/interfaces/product.interface';
import { productService } from '../../header/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../services/spinner.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/header/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  pageInit = 0;
  products: Product[] = [];
  categories: Array<string> = [];
  categorie = '';
  page = 1;
  dat = 0;
  searche: string = '';
  spinnerService = inject(SpinnerService);
  category$ = this.productService.categoryObservable;
  category='';
  dataService=inject(DataService)
  constructor(
    private productService: productService,
    private toaster: ToastrService,
    private routerActive:ActivatedRoute,
    private cdr:ChangeDetectorRef

  ) {
    this.categorie = this.productService.Category;
   this.page= this.routerActive.snapshot.params['page']
   console.log(this.page);
   

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

 
  searchProducts(search: string) {
   

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

  onClick(page:number){
    
this.page=page
if(page===1){
  this.pageInit=0
}
if(page>1){
  this.pageInit=page+5
}

    
  }





}
