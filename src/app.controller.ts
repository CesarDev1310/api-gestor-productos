import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './productos/entities/producto.entity';
import { ProductoDto } from './productos/dtos/producto.dto';
import { AuthGuard } from './auth/auth.guard';

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
  @UseGuards(AuthGuard)
  @Post()
  createProducto(@Body() producto : ProductoDto): Producto{
    return this.appService.createProducto(producto);
  }

  //Actualizar Producto
  @UseGuards(AuthGuard)
  @Post(':id')
  updateProducto(@Param('id') id: string, @Body() producto : ProductoDto ): Producto{
    return this.appService.updateProducto(id, producto);
  }

  //Eliminar producto
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProducto(@Param('id') id: string) : Producto[]{
    return this.appService.deleteProducto(id);
  }

}
