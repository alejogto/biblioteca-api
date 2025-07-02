import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) { }
async update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    const prestamo = await this.prestamoRepository.findOneBy({ id });
    if (!prestamo) {
        throw new NotFoundException(`Préstamo con id ${id} no encontrado`);
    }

    // Actualizamos los valores del préstamo
    Object.assign(prestamo, updatePrestamoDto);
    return await this.prestamoRepository.save(prestamo);
}
