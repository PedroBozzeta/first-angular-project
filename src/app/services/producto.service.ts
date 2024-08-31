import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient) { }
  public lista(): Observable<Producto[]> {
    const response = this.httpClient.get<Producto[]>(this.productoURL)
    console.log(JSON.stringify(response, null, 2))
    return this.httpClient.get<Producto[]>(this.productoURL);

  }
  public detalle(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL+'/'+id)
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put(this.productoURL +'/'+ id, producto)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.productoURL+'/'+id)
  }
  public crear(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL, producto);
  }
}
