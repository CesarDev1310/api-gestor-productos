import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Producto } from './productos/entities/producto.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProductos(): Producto[] {
    return this.appService.getProductos();
  }
}
