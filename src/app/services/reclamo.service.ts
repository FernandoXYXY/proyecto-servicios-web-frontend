import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/reclamo';


@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }

  insertaReclamo(data:Reclamo): Observable<any>{
    return this.http.post(baseUrlReclamo, data);
  }

  actualizaReclamo(data:Reclamo): Observable<any>{
    return this.http.put(baseUrlReclamo, data);
  }
  
  eliminaReclamo(data:Reclamo): Observable<any>{
    return this.http.delete(baseUrlReclamo+"/"+data.idReclamo);
  }

  listarReclamo(): Observable<any>{
    return this.http.get<any>(baseUrlReclamo+"/listar");
  }


  consultaReclamo(estado:number, fechaCompra:string, idCliente:number, idTipo:number):Observable<any>{
    
    const params = new HttpParams().set("estado", estado).set("fechaCompra", fechaCompra).set("idCliente", idCliente).set("idTipo", idTipo)
    return this.http.get<any>(baseUrlReclamo+"/listarReclamosPorParametros", {params});
  }


}
