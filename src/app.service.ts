import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './productos/entities/producto.entity';
import { ProductoDto } from './productos/dtos/producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(   
    @InjectRepository(Producto)
    private readonly productoRepository : Repository<Producto>
  ){}

  /*
  private baseDeDatos: Producto[] = [
    {id:'1', nombre:'Laptop DMC', precio: 3500, fechaCreacion: new Date(), enStock: true},
    {id:'2', nombre:'Teclado', precio: 30, fechaCreacion: new Date(), enStock: true},
    {id:'3', nombre:'Silla Gamer', precio: 1500, fechaCreacion: new Date(), enStock: true},
    {id:'4', nombre:'Mesa Gamer', precio: 1000, fechaCreacion: new Date(), enStock: true},
    {id:'5', nombre:'Cuaderno', precio: 6, fechaCreacion: new Date(), enStock: true},
    {id:'6', nombre:'Telefono', precio: 4500, fechaCreacion: new Date(), enStock: true}
  ];
  */

  //Metodos CRUD

  //R- Metodo GET (Listar elementos)
  async getProductos(): Promise<Producto[]> {
    //return this.baseDeDatos;
    return await this.productoRepository.find();
  }

  //R- Metodo GET (Lista un elemento)
  async getProducto(id : string): Promise<Producto> {    
    //const producto = this.baseDeDatos.find(p=> p.id ==id);
    const producto = await this.productoRepository.findOne({where:{id}});
    if (!producto) {
      throw new NotFoundException(`El producto con el ID ${id} no fue encontrado`);
    }
    return producto
  }

  //C- Metodo POST (crear elementos)
  async createProducto(producto : ProductoDto): Promise<Producto> {
    const nuevoProducto = await this.productoRepository.create(producto);
    /*
    const nuevoProducto : Producto = {
      id: Math.random().toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      enStock: producto.enStock,
      fechaCreacion: new Date(),
    };
    */

    //this.baseDeDatos.push(nuevoProducto);
    return await this.productoRepository.save(nuevoProducto);
  }

  //U- Metodo PUT (actualizar elementos)
  async updateProducto(id:string, productoActualizado : ProductoDto) : Promise<Producto> {
    //const existeProducto = this.getProducto(id);
    const existeProducto = await this.getProducto(id);    
    const productoFinal = this.productoRepository.merge(existeProducto, productoActualizado);
    /*const indiceProducto = this.baseDeDatos.findIndex(p=> p.id == id);
    this.baseDeDatos[indiceProducto] = {
      ...existeProducto,
      ...productoActualizado
    }*/
    //return this.baseDeDatos[indiceProducto]
    return await this.productoRepository.save(productoFinal);
  }

  //D- Metodo DELETE (eliminar elementos)
  async deleteProducto(id: string) : Promise<Producto[]> {
    //this.getProducto(id);
    const existeProducto = await this.getProducto(id);
    await this.productoRepository.remove(existeProducto);

    //this.baseDeDatos = this.baseDeDatos.filter(p=> p.id != id);

    return await this.getProductos();
  }  
  
}
