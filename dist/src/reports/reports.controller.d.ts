import { JwtUser } from '../common/decorators/current-user.decorator';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    dashboard(currentUser: JwtUser): Promise<{
        users: number;
        assets: number;
        assignedAssets: number;
        availableAssets: number;
        returns: number;
        materials: number;
        lowStockMaterials: number;
    }>;
}
