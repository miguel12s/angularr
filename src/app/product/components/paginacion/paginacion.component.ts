import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/header/interfaces/product.interface';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css'],
})
export class PaginacionComponent   {
  @Input() page!: number;
  @Input() products!: Product[];
  @Input() currentPage!:number
  @Input() numberOfPage!:number[]
  @Output() onClick = new EventEmitter<number>();


  product!: Product[];
  numberOfPages = [1, 2, 3, 4];
router=inject(ActivatedRoute)
constructor(){
  this.currentPage=1
this.page=this.currentPage

  
}



  changePage(pages: number) {
    this.currentPage = pages;

    this.onClick.emit(pages);
  }

  increment(page: number) {
   
    
    
    this.currentPage += 1;
    this.page=this.currentPage
    this.onClick.emit(this.page)
  }

  decrement() {
    this.page -= 1;
    this.currentPage=this.page
    this.onClick.emit(this.page)

  }
}
