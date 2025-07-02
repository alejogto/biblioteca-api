import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { Libro } from '../libro/entities/libro.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, Libro, Usuario])],
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule { }
