import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';



const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

const baseUrlMarca = AppSettings.API_ENDPOINT+ "/marca";


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
 

  constructor(private http: HttpClient) {  }

  insertaMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca, data);
  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca);
  }

  listarMarca(nombre:string, descripcion:string, certificado:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).set("certificado",certificado)
    .set("idPais", idPais).set("estado", estado);  
    return this.http.get<any>(baseUrlMarca + "/listaMarcaConParametros", {params});
 }

  

}

