import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './productos/entities/producto.entity';
import { ProductoDto } from './productos/dtos/producto.dto';

@Controller('productos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //listar productos
  @Get()
  getProductos(): Producto[] {
    return this.appService.getProductos();
  }

  //listar un producto
  @Get(':id')
  getProducto( @Param('id') id : string ): Producto {
    return this.appService.getProducto(id);
  }

  //Crear producto
  @Post()
  createProducto(@Body() producto : ProductoDto): Producto{
    return this.appService.createProducto(producto);
  }

  //Actualizar Producto
  @Post(':id')
  updateProducto(@Param('id') id: string, @Body() producto : ProductoDto ): Producto{
    return this.appService.updateProducto(id, producto);
  }

  //Eliminar producto
  @Delete(':id')
  deleteProducto(@Param('id') id: string) : Producto[]{
    return this.appService.deleteProducto(id);
  }

}
