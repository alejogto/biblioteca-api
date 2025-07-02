import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Autor } from 'src/autor/entities/autor.entity';

@Entity()
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    categoria: string;

    @Column()
    anio: number;

    @ManyToOne(() => Autor, autor => autor.libros)
    autor: Autor;
}
