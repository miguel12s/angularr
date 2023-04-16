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
  numberOfPage:number[]=[]
  
  constructor(
    private productService: productService,
    private toaster: ToastrService,
    

  ) {
   this.page=1
   

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
    this.pageInit=1
    this.page=1
    
  }

  
  goToProducts() {
    window.location.reload();
  }



  onClick(page:number){
    this.pageInit=0
this.page=page
if(page===1){
  this.pageInit=0
}
if(page>1){
  this.pageInit=page*5-5
}

    
  }





}
