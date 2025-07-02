import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { Libro } from './entities/libro.entity';



@Controller('libros')
export class LibroController {
    constructor(private readonly libroService: LibroService) { }

    // Crear un libro
    @Post()
    crear(@Body() createLibroDto: CreateLibroDto): Promise<Libro> {
        return this.libroService.crear(createLibroDto);
    }

    // Obtener todos los libros
    @Get()
    obtenerTodos(): Promise<Libro[]> {
        return this.libroService.obtenerTodos();
    }

    // Obtener un libro por ID
    @Get(':id')
    obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Libro | null> {
        return this.libroService.obtenerPorId(id);
    }

    // Actualizar un libro
    @Put(':id')
    actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() datos: Partial<CreateLibroDto>
    ): Promise<Libro | null> {
        return this.libroService.actualizar(id, datos);
    }

    // Eliminar un libro
    @Delete(':id')
    eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.libroService.eliminar(id);
    }
}
