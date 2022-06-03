import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  productos :Producto[]=[];
  pais : Pais[]=[];
  marca : Marca[]=[];
  filtro : string="";

  producto : Producto={
    
      idProducto: 0,
      nombre: "",
      serie: "",
      durabilidad: "",
      fechaVigencia: new Date,
      precio: 0,
      stock: 0,
      estado: 1,
      marca: {
        idMarca: 0,

        pais: {
          idPais: -1,
          
        }
      },
      pais: {
        "idPais": -1,
      
    }

  }

  constructor( private paisService: PaisService, private marcaSevice: MarcaService, private productoService: ProductoService) { 
    this.paisService.listaPais().subscribe(
      (x) => this.pais = x

        );

       this.marcaSevice.listaMarca().subscribe(
         (y) => this.marca = y
    
           );

   }

   
   insertado(){
      this.productoService.insertaProducto(this.producto).subscribe(

        Response => {
              alert(Response.mensaje);
        },

        error =>{
          alert(error.mensaje);

        }
        
        
      )

   }

   buscar(aux: Producto){
    this.producto  = aux;
 }
 


   consulta(){
    this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.productos = x
    );
}

  ngOnInit(): void {
  }

  actualizar(){ 
   
    this.productoService.actualizarProducto(this.producto).subscribe(
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
    this.productoService.eliminarProducto(this.producto).subscribe(
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
      this.producto={
      idProducto: 0,
      nombre: "",
      serie: "",
      durabilidad: "",
      fechaVigencia: new Date(),
      precio: 0,
      stock: 0,
      estado: 1,
      marca: {
        idMarca: 0,

        pais: {
          idPais: -1,
          
        }
      },
      pais: {
        idPais: -1,
        
      },
      
    }

   }
  }

}
