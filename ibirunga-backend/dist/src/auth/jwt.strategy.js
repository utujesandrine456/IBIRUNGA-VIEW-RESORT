"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    prisma;
    constructor(config, prisma) {
        const secret = config.get('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is required');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
            algorithms: ['HS256'],
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        if (!payload?.sub || !payload?.email) {
            throw new common_1.UnauthorizedException('Invalid authentication token.');
        }
        if (payload.role && payload.role !== 'admin') {
            throw new common_1.UnauthorizedException('Invalid admin token.');
        }
        const admin = await this.prisma.admin.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true },
        });
        if (!admin || admin.email !== payload.email) {
            throw new common_1.UnauthorizedException('Admin account not found or revoked.');
        }
        return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: 'admin',
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map