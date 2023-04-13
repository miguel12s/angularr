import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productService } from './services/product.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="d-flex    " color="primary">
      <span routerLink="products/1" class="me-5"> My store </span>
    

      <div class=" d-flex contenedor  w-100 justify-content-end">
        <app-cart class="shopping-cart" (click)="goToCheckout()" />
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private productService: productService) {}

  public category = '';
  categories: string[] = ['All'];
  goToCheckout() {
    
    this.router.navigate(['description']);
  }
  ngOnInit(): void {
  
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


}
