import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {


  marcas :Marca[]=[];
  pais : Pais[]=[];
  filtro : string="";

  marca : Marca={
    
    idMarca: 0,
    nombre: "",
    descripcion: "",
    certificado: "",
    fechaVigencia: new Date,
    estado: 1,

    pais: {
      "idPais": -1,
    
  }

}







constructor( private paisService: PaisService, private marcaService: MarcaService) { 
  this.paisService.listaPais().subscribe(
    (x) => this.pais = x

      );


 }

 insertado(){
  this.marcaService.insertaMarca(this.marca).subscribe(

    Response => {
          alert(Response.mensaje);
    },

    error =>{
      alert(error.mensaje);

    }
    
    
  )

}

buscar(aux: Marca){
this.marca  = aux;
}


consulta(){
  this.marcaService.listaMarcaxnombre(this.filtro==""?"todos":this.filtro).subscribe(
        (x) => this.marcas = x
  );
}



  ngOnInit(): void {
  }


  actualizaEstado(aux : Marca){
    aux.estado = aux.estado == 0? 1 :0;
    this.marcaService.actualizarMarca(aux).subscribe();
}

  actualizar(){ 
   
    this.marcaService.actualizarMarca(this.marca).subscribe(
      (x) =>  alert(x.mensaje)
    );
      //limpiar el ngModel
    this.limpiar();
    //recargar la pag
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
 }


 eliminar(){
  this.marcaService.eliminarMarca(this.marca).subscribe(
    (x) => alert(x.mensaje)
  );
    //limpiar los ngModels
    this.limpiar();
    //recargar la pag
    setTimeout(() => {
      window.location.reload();
    }, 1500);

 }

 limpiar(){
  {
    this.marca={
      idMarca: 0,
      nombre: "",
      descripcion: "",
      certificado: "",
      fechaVigencia: new Date,
      estado: 1,
  
      pais: {
        "idPais": -1,
      
    }
    
  }

 }
}




}