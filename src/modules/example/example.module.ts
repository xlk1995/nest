import { Module } from '@nestjs/common';
import { FirstService } from './services/first.service';
import { FourthService } from './services/fourth.service';
import { SecondService } from './services/second.service';
import { ThirdService } from './services/third.service';
import { TestController } from './controllers/test.controller';

const firstObject = {
    useValue: () => 'useValue提供者11',
    useAlias: () => '别名提供者',
};
const firstInstance = new FirstService();

@Module({
    providers: [
        {
            provide: FirstService,
            useValue: firstObject,
        },
        {
            provide: 'ID_EXAMPLE',
            useValue: firstInstance,
        },
        {
            provide: SecondService,
            useClass: ThirdService,
        },
        {
            provide: 'FACTORY_EXAMPLE',
            useFactory(second: SecondService) {
                const factory = new FourthService(second);
                return factory;
            },
            inject: [SecondService],
        },
        {
            provide: 'ALIAS_EXAMPLE',
            useExisting: FirstService,
        },
        {
            provide: 'ASYNC_EXAMPLE',
            useFactory: async () => {
                const factory = new FourthService(new SecondService());
                return factory.getPromise();
            },
        },
    ],
    controllers: [TestController],
})
export class ExampleModule {}
