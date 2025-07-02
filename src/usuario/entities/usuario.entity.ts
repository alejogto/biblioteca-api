import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prestamo } from '../../prestamo/entities/prestamo.entity'; // ✅ IMPORT CORRECTO

@Entity('usuarios') // Nombre de la tabla en la base de datos
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    telefono: string;

    @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
    prestamos: Prestamo[];
}
