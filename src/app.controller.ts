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
  async getProductos(): Promise<Producto[]>  {
    return await this.appService.getProductos();
  }

  //listar un producto
  @Get(':id')
  async getProducto( @Param('id') id : string ): Promise<Producto>  {
    return await this.appService.getProducto(id);
  }

  //Crear producto  
  @UseGuards(AuthGuard)
  @Post()
  async createProducto(@Body() producto : ProductoDto): Promise<Producto> {
    return await this.appService.createProducto(producto);
  }

  //Actualizar Producto
  @UseGuards(AuthGuard)
  @Post(':id')
  async updateProducto(@Param('id') id: string, @Body() producto : ProductoDto ): Promise<Producto> {
    return await this.appService.updateProducto(id, producto);
  }

  //Eliminar producto
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProducto(@Param('id') id: string) : Promise<Producto[]>{
    return await this.appService.deleteProducto(id);
  }

}
