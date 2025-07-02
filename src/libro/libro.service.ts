import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from 'src/autor/entities/autor.entity';
import { CreateLibroDto } from './dto/create-libro.dto';

@Injectable()
export class LibroService {
    constructor(
        @InjectRepository(Libro)
        private readonly libroRepository: Repository<Libro>,

        @InjectRepository(Autor)
        private readonly autorRepository: Repository<Autor>,
    ) { }

    // Crear libro con autor relacionado
    async crear(createLibroDto: CreateLibroDto): Promise<Libro> {
        const autor = await this.autorRepository.findOneBy({ id: createLibroDto.autorId });

        if (!autor) {
            throw new NotFoundException('Autor no encontrado');
        }

        const nuevoLibro = this.libroRepository.create({
            titulo: createLibroDto.titulo,
            categoria: createLibroDto.categoria,
            anio: createLibroDto.anio,
            autor: autor,
        });

        return this.libroRepository.save(nuevoLibro);
    }

    // Obtener todos los libros, incluyendo la relación con autor
    async obtenerTodos(): Promise<Libro[]> {
        return this.libroRepository.find({ relations: ['autor'] });
    }

    // Obtener un libro por su ID
    async obtenerPorId(id: number): Promise<Libro | null> {
        return this.libroRepository.findOne({
            where: { id },
            relations: ['autor'],
        });
    }

    // Actualizar un libro, incluyendo su autor si se especifica
    async actualizar(id: number, datos: Partial<Libro & { autorId?: number }>): Promise<Libro | null> {
        const libro = await this.libroRepository.findOneBy({ id });

        if (!libro) {
            throw new NotFoundException('Libro no encontrado');
        }

        // Si se incluye autorId, buscar el nuevo autor
        if (datos.autorId) {
            const autor = await this.autorRepository.findOneBy({ id: datos.autorId });
            if (!autor) {
                throw new NotFoundException('Autor no encontrado');
            }
            libro.autor = autor;
        }

        // Actualizar otros campos si vienen en el body
        libro.titulo = datos.titulo ?? libro.titulo;
        libro.categoria = datos.categoria ?? libro.categoria;
        libro.anio = datos.anio ?? libro.anio;

        return this.libroRepository.save(libro);
    }

    // Eliminar un libro por su ID
    async eliminar(id: number): Promise<void> {
        await this.libroRepository.delete(id);
    }
}
