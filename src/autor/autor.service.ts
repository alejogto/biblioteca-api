import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) { }

  // Crear autor
  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const nuevoAutor = this.autorRepository.create(createAutorDto);
    return this.autorRepository.save(nuevoAutor);
  }

  // Obtener todos los autores
  async findAll(): Promise<Autor[]> {
    return this.autorRepository.find();
  }

  // Obtener un autor por ID
  async findOne(id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOneBy({ id });
    if (!autor) throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    return autor;
  }

  // Actualizar un autor
  async update(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id);
    const autorActualizado = Object.assign(autor, updateAutorDto);
    return this.autorRepository.save(autorActualizado);
  }

  // Eliminar un autor
  async remove(id: number): Promise<void> {
    const resultado = await this.autorRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
  }
}
