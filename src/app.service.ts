import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './productos/entities/producto.entity';

@Injectable()
export class AppService {

  private baseDeDatos: Producto[] = [
    {id:'1', nombre:'Laptop DMC', precio: 3500, fechaCreacion: new Date(), enStock: true},
    {id:'2', nombre:'Teclado', precio: 30, fechaCreacion: new Date(), enStock: true},
    {id:'3', nombre:'Silla Gamer', precio: 1500, fechaCreacion: new Date(), enStock: true},
    {id:'4', nombre:'Mesa Gamer', precio: 1000, fechaCreacion: new Date(), enStock: true},
    {id:'5', nombre:'Cuaderno', precio: 6, fechaCreacion: new Date(), enStock: true},
    {id:'6', nombre:'Telefono', precio: 4500, fechaCreacion: new Date(), enStock: true}
  ];

  //Metodos CRUD

  //R- Metodo GET (Listar elementos)
  getProductos(): Producto[] {
    return this.baseDeDatos;
  }

  //R- Metodo GET (Lista un elemento)
  getProducto(id : string): Producto {
    const producto = this.baseDeDatos.find(p=> p.id ==id);
    if (!producto) {
      throw new NotFoundException(`El producto con el ID ${id} no fue encontrado`);
    }
    return producto
  }

  //C- Metodo POST (crear elementos)
  createProducto(): void {
    
  }

  //U- Metodo PUT (actualizar elementos)


  //D- Metodo DELETE (eliminar elementos)

  
}
