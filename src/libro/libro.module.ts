import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Autor } from '../autor/entities/autor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Libro, Autor])],
    controllers: [LibroController],
    providers: [LibroService],
    exports: [TypeOrmModule],
})
export class LibroModule { }
