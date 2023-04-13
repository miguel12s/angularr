import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/header/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);
  private url = 'https://fakestoreapi.com/products?limit=5';

  getProductForNumber(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}`);
  }
}
