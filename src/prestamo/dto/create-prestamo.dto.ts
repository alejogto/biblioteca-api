import { IsNotEmpty, IsDateString, IsInt, Min } from 'class-validator';

export class CreatePrestamoDto {
    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (formato ISO)' })
    fechaInicio: string;

    @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
    @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida (formato ISO)' })
    fechaFin: string;

    @IsInt({ message: 'El ID del libro debe ser un número entero' })
    @Min(1, { message: 'El ID del libro debe ser mayor a 0' })
    libroId: number;

    @IsInt({ message: 'El ID del usuario debe ser un número entero' })
    @Min(1, { message: 'El ID del usuario debe ser mayor a 0' })
    usuarioId: number;
}
