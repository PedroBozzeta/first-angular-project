import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrx:ToastrService,
  ) { }


  producto: Producto | null = null
  id:number=0

  ngOnInit(): void {
   this.id= Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productoService.detalle(this.id).subscribe(data =>
      this.producto = data,
      err => console.error(err)
    )
  }

onUpdate() {
    if (this.producto) {
      this.productoService.update(this.id, this.producto).subscribe(
        data => {
          this.toastrx.success('Producto Actualizado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/'])
        },
        err => {
          this.toastrx.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } )}
  }
   
}
