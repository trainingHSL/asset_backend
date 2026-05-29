"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const organizations_module_1 = require("./organizations/organizations.module");
const users_module_1 = require("./users/users.module");
const assets_module_1 = require("./assets/assets.module");
const assignments_module_1 = require("./assignments/assignments.module");
const returns_module_1 = require("./returns/returns.module");
const materials_module_1 = require("./materials/materials.module");
const reports_module_1 = require("./reports/reports.module");
const organization_entity_1 = require("./organizations/organization.entity");
const user_entity_1 = require("./users/user.entity");
const asset_entity_1 = require("./assets/asset.entity");
const asset_assignment_entity_1 = require("./assignments/asset-assignment.entity");
const asset_return_entity_1 = require("./returns/asset-return.entity");
const material_entity_1 = require("./materials/material.entity");
const material_issue_entity_1 = require("./materials/material-issue.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST'),
                    port: Number(config.get('DB_PORT') || 3306),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASS'),
                    database: config.get('DB_NAME'),
                    entities: [organization_entity_1.Organization, user_entity_1.User, asset_entity_1.Asset, asset_assignment_entity_1.AssetAssignment, asset_return_entity_1.AssetReturn, material_entity_1.Material, material_issue_entity_1.MaterialIssue],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            organizations_module_1.OrganizationsModule,
            users_module_1.UsersModule,
            assets_module_1.AssetsModule,
            assignments_module_1.AssignmentsModule,
            returns_module_1.ReturnsModule,
            materials_module_1.MaterialsModule,
            reports_module_1.ReportsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map