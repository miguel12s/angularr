import { Pipe, PipeTransform } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/header/interfaces/product.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {


  search:string=''
  product!:Product[]
constructor(){}


  transform(product:Product[],  page:number,search:string,categorie:Observable<string>): Product[] {
 
if(product.length===20){
this.product=product

this.product.slice(page,page+6)
}



  if( search.length!=0)

  
  return  this.product.filter(products=>products.title.includes(search)) .slice(page,page+6)


 


    if(search.length==0)
   return product.slice(page,page+6)



 
    
return this.product
  }
}
