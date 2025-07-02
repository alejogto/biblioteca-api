import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AutorModule } from './autor/autor.module';
import { LibroModule } from './libro/libro.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrestamoModule } from './prestamo/prestamo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AutorModule,
    LibroModule,
    UsuarioModule,
    PrestamoModule, // ✅ módulo de préstamos agregado correctamente
  ],
})
export class AppModule { }

console.log('DB_USERNAME:', process.env.DB_USERNAME);
