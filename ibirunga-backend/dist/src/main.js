"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useBodyParser('json', { limit: '2mb' });
    app.useBodyParser('urlencoded', { extended: true, limit: '2mb' });
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
            : true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const port = process.env.PORT ?? 8000;
    await app.listen(port);
    console.log(`Ibirunga CMS API running on http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map