import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
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
    private productoService: ProductoService,
    private router:Router,
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger mr-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No hay vuelta atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "No, mejor no",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id).subscribe(data => {
          console.log(data);
        this.router.navigate(['/'])},
          err => console.log(err))
        this.router.navigate(['/'])
        swalWithBootstrapButtons.fire({
          title: "OK!",
          text: "Producto Eliminado",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Producto a salvo",
          icon: "error"
        });
      }
    });
  }
}
