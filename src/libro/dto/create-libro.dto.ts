export class CreateLibroDto {
    titulo: string;
    categoria: string;
    anio: number;
    autorId: number; // ID del autor con quien se relaciona el libro
}
