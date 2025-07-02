import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Libro } from 'src/libro/entities/libro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Injectable()
export class PrestamoService {
    constructor(
        @InjectRepository(Prestamo)
        private readonly prestamoRepository: Repository<Prestamo>,

        @InjectRepository(Libro)
        private readonly libroRepository: Repository<Libro>,

        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    // Crear préstamo
    async create(dto: CreatePrestamoDto): Promise<Prestamo> {
        const libro = await this.libroRepository.findOneBy({ id: dto.libroId });
        const usuario = await this.usuarioRepository.findOneBy({ id: dto.usuarioId });

        if (!libro || !usuario) {
            throw new NotFoundException('Libro o usuario no encontrado');
        }

        const nuevoPrestamo = this.prestamoRepository.create({
            fechaInicio: dto.fechaInicio,
            fechaFin: dto.fechaFin,
            libro,
            usuario,
        });

        return this.prestamoRepository.save(nuevoPrestamo);
    }

    // Obtener todos los préstamos
    findAll(): Promise<Prestamo[]> {
        return this.prestamoRepository.find({ relations: ['libro', 'usuario'] });
    }

    // Obtener un préstamo por ID
    async findOne(id: number): Promise<Prestamo> {
        const prestamo = await this.prestamoRepository.findOne({
            where: { id },
            relations: ['libro', 'usuario'],
        });

        if (!prestamo) {
            throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
        }

        return prestamo;
    }

    // Actualizar préstamo
    async update(id: number, dto: UpdatePrestamoDto): Promise<Prestamo> {
        const prestamo = await this.findOne(id);
        const prestamoActualizado = Object.assign(prestamo, dto);
        return this.prestamoRepository.save(prestamoActualizado);
    }

    // Eliminar préstamo
    async remove(id: number): Promise<void> {
        const resultado = await this.prestamoRepository.delete(id);
        if (resultado.affected === 0) {
            throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
        }
    }
}
