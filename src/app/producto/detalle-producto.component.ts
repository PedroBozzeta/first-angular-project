import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{


  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  
   
  producto:Producto|null=null
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productoService.detalle(Number(id)).subscribe(
      data => {
        this.producto = data;
        console.log(data)
      }, err => {
        console.error(err)
      }
    );
  }
  volver() {
    this.router.navigate(['/'])
  }

}
