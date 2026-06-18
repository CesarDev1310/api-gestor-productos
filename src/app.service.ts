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

  //Metodos CRUD

  //R- Metodo GET (Listar elementos)
  async getProductos(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  //R- Metodo GET (Lista un elemento)
  async getProducto(id : string): Promise<Producto> {    
    const producto = await this.productoRepository.findOne({where:{id}});
    if (!producto) {
      throw new NotFoundException(`El producto con el ID ${id} no fue encontrado`);
    }
    return producto
  }

  //C- Metodo POST (crear elementos)
  async createProducto(producto : ProductoDto): Promise<Producto> {
    const nuevoProducto = await this.productoRepository.create(producto);
    return await this.productoRepository.save(nuevoProducto);
  }

  //U- Metodo PUT (actualizar elementos)
  async updateProducto(id:string, productoActualizado : ProductoDto) : Promise<Producto> {
    const existeProducto = await this.getProducto(id);    
    const productoFinal = this.productoRepository.merge(existeProducto, productoActualizado);
    return await this.productoRepository.save(productoFinal);
  }

  //D- Metodo DELETE (eliminar elementos)
  async deleteProducto(id: string) : Promise<Producto[]> {
    //this.getProducto(id);
    const existeProducto = await this.getProducto(id);
    await this.productoRepository.remove(existeProducto);

    return await this.getProductos();
  }  
  
}
