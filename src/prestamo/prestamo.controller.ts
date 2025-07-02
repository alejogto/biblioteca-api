import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Controller('prestamos')
export class PrestamoController {
    constructor(private readonly prestamoService: PrestamoService) { }

    @Post()
    create(@Body() createPrestamoDto: CreatePrestamoDto) {
        return this.prestamoService.create(createPrestamoDto);
    }

    @Get()
    findAll() {
        return this.prestamoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const prestamo = await this.prestamoService.findOne(id);
        if (!prestamo) {
            throw new NotFoundException('Préstamo no encontrado');
        }
        return prestamo;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatePrestamoDto: UpdatePrestamoDto) {
        return this.prestamoService.update(id, updatePrestamoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.prestamoService.remove(id);
    }
}
