import { Component, Inject, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { productService } from '../header/services/product.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { Product } from '../header/interfaces/product.interface';
import { tap } from 'rxjs';
import Swal from 'sweetalert2'

 
@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
  
 
  

  
})
export class ActualizarComponent implements OnInit {  

  
  contactForm!:FormGroup
  categories: Array<String> = [];
  products:Array<Product>=[]
  indice=0
  product!:Product
  constructor(
    private productService: productService,
    private readonly fb: FormBuilder,
    private routerActive:ActivatedRoute,
    private router:Router,
private cdr:ChangeDetectorRef



  ){
    this.contactForm = this.initForm()  }

  ngOnInit(): void {
    
this.indice=this.routerActive.snapshot.params['id']

this.productService.findProductForId(this.indice).pipe(
  tap((response:Product)=>{
  this.product=response
    this.onPathValue(response)
  })

  
  
  ).subscribe(()=>{
    
  })
this.productService.categories.pipe(
  tap((response:Array<string>)=>{
    this.categories=response
  })
).subscribe()
    

   
   

   
  

  }

  onSubmit ( contactForm: any): void {
    console.log(contactForm);
    
    const  product:Product={
      id: this.indice,
      title: contactForm.title,
      price: contactForm.price,
      description: contactForm.description,
      category: contactForm.category,
      image: contactForm.image,
      rating:{ count: Number(contactForm.stock), rate:Number(contactForm.rating) },
      qty: this.product.qty
    }
    console.log(this.product);
    
    
    this.productService.setUser(product,this.indice)
  Swal.fire({
    'title':'Producto Actualizado',
    'text':'Se redireccionara a la pagina principal',
    icon:'success'
  }).then((response)=>{
    if(response.isConfirmed){
    }
    this.router.navigate(['/products'])

  }
   
  )
  }

  initForm():FormGroup{
    return this.fb.group({
      title:['',[Validators.required]],
      description:['',Validators.required],
      image:['',Validators.required],
      price:['',Validators.required],
      stock:['',Validators.required],
      rating:['',Validators.required],
      category:['',Validators.required],
      qty:['',Validators.required]

    })
  }
  onPathValue(product:Product): void {
   
   
    
    this.contactForm.patchValue({ 
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      stock: product.rating.count,
      rating:product.rating.rate,
      category: product.category,
      
      
    
    
    });
  }

  
}
