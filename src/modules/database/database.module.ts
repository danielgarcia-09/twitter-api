import { Module } from '@nestjs/common';
import { DatabaseProvider } from 'src/database';

@Module({
    imports: [DatabaseProvider],
    exports: [DatabaseProvider]
})
export class DatabaseModule {}
