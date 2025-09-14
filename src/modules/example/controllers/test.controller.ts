import { Controller, Get, Inject } from '@nestjs/common';
import { FourthService } from '../services/fourth.service';
import { FirstService } from '../services/first.service';
import { SecondService } from '../services/second.service';

@Controller('test')
export class TestController {
    constructor(
        private first: FirstService,
        @Inject('ID_EXAMPLE') private readonly idExample: FirstService,
        @Inject('FACTORY_EXAMPLE') private readonly factoryExample: FourthService,
        @Inject('ALIAS_EXAMPLE') private readonly aliasExample: FirstService,
        @Inject('ASYNC_EXAMPLE') private readonly asyncExample: SecondService,
    ) {}

    @Get('value')
    async useValue() {
        return this.first.useValue();
    }

    @Get('id')
    async useId() {
        return this.idExample.useId();
    }

    @Get('factory')
    async useFactory() {
        return this.factoryExample.getContent();
    }

    @Get('alias')
    async useAlias() {
        return this.aliasExample.useAlias();
    }

    @Get('async')
    async useAsync() {
        return this.asyncExample.useAsync();
    }
}
