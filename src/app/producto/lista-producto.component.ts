import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-lista-producto',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-producto.component.html',
  styleUrl: './lista-producto.component.css'
})
export class ListaProductoComponent implements OnInit{
  productos: Producto[] = [];

  constructor(
    private productoService:ProductoService
  ) { }
  
  ngOnInit(): void{
    this.cargarProductos();
  }

  cargarProductos(): void{
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
        console.log(data)
      }, err => {
        console.error(err)
      }
    )
  }

  borrar(id: number) {
    console.log("Se eliminará el producto con id "+id)
  }
}
