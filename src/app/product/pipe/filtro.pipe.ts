import { Pipe, PipeTransform, inject } from '@angular/core';
import { Product } from 'src/app/header/interfaces/product.interface';
import { productService } from 'src/app/header/services/product.service';
@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {

  productService=inject(productService)
  constructor() { }

  transform(product: Product[], pageInit: number, search: string): Product[] {


    search = search.toLowerCase()

    if (search.length != 0){
      this.productService.setProductFilter(product.filter(products => products.title.includes(search)))
      
   return product.filter(products => products.title.includes(search)).slice(pageInit,pageInit+5)
    }
    return product.slice(pageInit, pageInit + 5)
  }
}
