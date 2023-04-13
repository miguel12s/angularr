import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/header/interfaces/product.interface';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {

  product!:Product[]
  constructor() {}

  transform(product: Product[], pageInit: number,search:string): Product[] {
    
    
    
  if (search.length!=0)

  
  return  product.filter(products=>products.title.includes(search))

  

  

        
      
    
      



    
    
    
    return product.slice(pageInit, pageInit + 5);
  }
}
