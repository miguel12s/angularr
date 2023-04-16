import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Product } from 'src/app/header/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class productService {
  constructor(private httpClient: HttpClient) { }
  private url = 'https://fakestoreapi.com/products';
  private urlCategories = 'https://fakestoreapi.com/products/categories';
category=''
  private price$ = new BehaviorSubject<number>(0);
  private quantity$ = new BehaviorSubject<number>(0);
  product: Product[] = [];
  private card$ = new BehaviorSubject<Product[]>([]);


  private category$=new BehaviorSubject<string>('')

  get products(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url)
  }

  

  setUser(product: Product, indice: number): void {
    if(product.qty===undefined){
     product.qty=0

     const qty = product.qty
     this.product[indice - 1] = product;
     this.product[indice - 1].qty = qty;
 this.quantity$.next(this.product.length)
     this.getprice();
     this.card$.next(this.product);

    }else{
  
    const qty = this.product[indice - 1].qty 
   
    

    this.product[indice - 1] = product;
    this.product[indice - 1].qty = qty;
this.quantity$.next(this.product.length)
    this.getprice();
    this.card$.next(this.product);
  }
  }
  get categories() {
    return this.httpClient.get<Array<string>>(this.urlCategories);
  }

  public findProductForId(indice: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${indice}`);
  }

  get priceObservable(): Observable<number> {
    return this.price$.asObservable();
  }

  get quantityObservable(): Observable<number> {
    return this.quantity$.asObservable();
  }

  get cartObservable(): Observable<Product[]> {
    return this.card$.asObservable();
  }

  addToCart(product: Product): void {
    const isProduct = this.product.find(({ id }) => id == product.id);

    if (isProduct) {
      isProduct.qty += 1;
    } else {
      this.product.push({ ...product, qty: 1 });
    }

    this.card$.next(this.product);
    this.quantity$.next(this.product.length);
    this.getprice();
  }

  getQuantities(): void {
    const quantity = this.product.reduce((acc, prod) => (acc += prod.qty), 0);
    this.quantity$.next(quantity);
  }

  getprice() {
    const priceTotal = this.product.reduce(
      (acc, prod: Product) => (acc += prod.qty * prod.price),
      0
    );

    this.price$.next(priceTotal);
  }

  resetCart() {
    this.card$.next([]);
    this.price$.next(0);
    this.quantity$.next(0);
    this.product = [];
  }

  updateQty(product: Product) {
    const isProduct = this.product.find(({ id }) => id == product.id);
    if (isProduct) {
      isProduct.qty += 1;
    }
    this.card$.next(this.product);
    this.getprice();
  }

  deleteProduct(product: Product) {
    const isProduct = this.product.findIndex(({ id }) => id == product.id);
    console.log(isProduct);
    let removed = this.product.splice(isProduct, 1);
    console.log(removed);
    this.quantity$.next(this.product.length);
    this.card$.next(this.product);
    this.getprice();
  }

  deleteQty(product: Product) {
    let isProduct = this.product.find(({ id }) => id == product.id);
    if (isProduct && isProduct.qty != 0) {
      isProduct.qty -= 1;
      this.card$.next(this.product);
      this.getprice();
    }
    if (isProduct!.qty === 0) {
      console.log('ENTRAS');

      this.deleteProduct(product);
    }
  }


 

  get categoryObservable():Observable<string>{
    return this.category$.asObservable()
  }

   setProductFilter(product:Product[]):Product[]{
   
return product    
  }


  



}
