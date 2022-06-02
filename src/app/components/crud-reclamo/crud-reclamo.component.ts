import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {

  //para la tabla
  reclamos: Reclamo [] = [];

  //variables globales, arraylist de 
  tipoReclamo: TipoReclamo[] = [];
  cliente: Cliente[] = [];
  
  reclamo: Reclamo = {
    idReclamo:0,
    descripcion:"",
    fechaCompra: new Date,
    estado:1,
      tipoReclamo:{
        idTipoReclamo:-1
      },
      cliente:{
        idCliente:-1
      }
  };




  constructor(private tipoReclamoService:TipoReclamoService, private clienteService:ClienteService, private reclamoService:ReclamoService) { 
    this.tipoReclamoService.listaTipoReclamo().subscribe(
      (x) => this.tipoReclamo = x
    );

    this.clienteService.listaCliente().subscribe(
      (c) => this.cliente = c
    );

    this.reclamoService.listarReclamo().subscribe(
      (r) => this.reclamos = r
    );
  }


  insertado(){
    this.reclamoService.insertaReclamo(this.reclamo).subscribe(
      (x) => alert(x.mensaje) 
    );

    //limpiar ngModel
    this.limpiar();
    //recargar la pag
    setTimeout(() => {
      window.location.reload();
    }, 1500);
      
 }

 

 actualizar(){ 
   
    this.reclamoService.actualizaReclamo(this.reclamo).subscribe(
      (x) =>  alert(x.mensaje)
    );
      //limpiar el ngModel
    this.limpiar();
    //recargar la pag
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    
 }

 eliminar(){
  this.reclamoService.eliminaReclamo(this.reclamo).subscribe(
    (x) => alert(x.mensaje)
  );
    //limpiar los ngModels
    this.limpiar();
    //recargar la pag
    setTimeout(() => {
      window.location.reload();
    }, 1500);

 }

 buscar(aux: Reclamo){
    this.reclamo  = aux;
 }

 limpiar(){
   //limpiar ngModel
  this.reclamo = {
    idReclamo:0,
    descripcion:"",
    estado:1,
    fechaCompra:new Date(),
      tipoReclamo:{
        idTipoReclamo:-1
      },
      cliente:{
        idCliente:-1
      }
  };
 }

  ngOnInit(): void {
  }

  

}
