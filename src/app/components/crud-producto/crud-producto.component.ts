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
      pais:{
        idPais:-1
      },

      marca:{
        idMarca: -1
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

 


   consulta(){
    this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.productos = x
    );
}

  ngOnInit(): void {
  }

}
