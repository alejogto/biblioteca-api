// src/prestamo/entities/prestamo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Libro } from 'src/libro/entities/libro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Prestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fechaInicio: string;

    @Column({ type: 'date' })
    fechaFin: string;

    @ManyToOne(() => Libro, { eager: true })
    libro: Libro;

    @ManyToOne(() => Usuario, { eager: true })
    usuario: Usuario;
}
