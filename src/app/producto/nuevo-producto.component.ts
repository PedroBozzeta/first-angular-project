import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { Producto } from '../models/producto';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent implements OnInit{
  ngOnInit(): void {
    
  }

  nombre: string = "";
  precio: number = 0;

  constructor(
    private productoService: ProductoService,
    private toastrx: ToastrService,
    private router:Router,
  ) {
  }

  onCreate(): void{
    const producto = new Producto(this.nombre, this.precio);
    console.log("Creando")
    this.productoService.crear(producto).subscribe(
      data => {
        this.toastrx.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/'])
      },
      err => {
        this.toastrx.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    )
  }
}
