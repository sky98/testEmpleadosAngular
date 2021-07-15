import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUrl = environment.baseUrl + 'empleados'
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private httpClient: HttpClient) { }

  index(){
    return this.httpClient.get(this.baseUrl, { headers: this.headers })
  }
  show(id: number){
    return this.httpClient.get(this.baseUrl + '/'+ id, { headers: this.headers })
  }
  update(empleado: Empleado){
    return this.httpClient.patch(this.baseUrl + '/' + empleado.id, empleado, { headers: this.headers })
  }
  store(empleado: Empleado){
    return this.httpClient.post(this.baseUrl, empleado, { headers: this.headers })
  }
  delete(empleado: Empleado){
    return this.httpClient.delete(this.baseUrl + '/'+ empleado.id, { headers: this.headers })
  }
}
