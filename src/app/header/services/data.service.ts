import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/header/interfaces/product.interface";


@Injectable({
    providedIn:'root'
})
export class DataService{

private httpClient=inject(HttpClient)
private url= 'https://fakestoreapi.com/products';

setProduct(product:Product,indice:number):Observable<Product>{
    return this.httpClient.patch<Product>(`${this.url}/${indice}`,product)
}


}