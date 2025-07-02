// src/autor/autor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor } from './entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutorController],
  providers: [AutorService],
  exports: [TypeOrmModule], // exporta el repositorio si otros módulos lo necesitan
})
export class AutorModule { }
