import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
        return this.usuarioRepository.save(nuevoUsuario);
    }

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return usuario;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.usuarioRepository.preload({
            id,
            ...updateUsuarioDto,
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        return this.usuarioRepository.save(usuario);
    }

    async remove(id: number): Promise<void> {
        const usuario = await this.findOne(id);
        await this.usuarioRepository.remove(usuario);
    }
}
