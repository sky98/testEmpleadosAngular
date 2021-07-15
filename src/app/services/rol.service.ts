import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  baseUrl = environment.baseUrl+'roles'
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private httpClient: HttpClient) { }

  index(){
    return this.httpClient.get(this.baseUrl, { headers: this.headers })
  }
}
