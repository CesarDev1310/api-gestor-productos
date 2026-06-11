import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './productos/entities/producto.entity';
import { ProductoDto } from './productos/dtos/producto.dto';

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
  createProducto(producto : ProductoDto): Producto {
    const nuevoProducto : Producto = {
      id: Math.random().toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      enStock: producto.enStock,
      fechaCreacion: new Date(),
    };

    this.baseDeDatos.push(nuevoProducto);
    return nuevoProducto;
  }

  //U- Metodo PUT (actualizar elementos)
  updateProducto(id:string, productoActualizado : ProductoDto) : Producto {
    const existeProducto = this.getProducto(id);
    const indiceProducto = this.baseDeDatos.findIndex(p=> p.id == id);
    this.baseDeDatos[indiceProducto] = {
      ...existeProducto,
      ...productoActualizado
    }
    return this.baseDeDatos[indiceProducto]
  }

  //D- Metodo DELETE (eliminar elementos)
  deleteProducto(id: string) : Producto[] {
    this.getProducto(id);
    this.baseDeDatos = this.baseDeDatos.filter(p=> p.id != id);

    return this.getProductos();
  }
  
}
