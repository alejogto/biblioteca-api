import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from 'src/libro/entities/libro.entity';

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    nacionalidad: string;

    // Relación: un autor puede tener muchos libros
    @OneToMany(() => Libro, libro => libro.autor)
    libros: Libro[];
}
