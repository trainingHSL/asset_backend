import { JwtUser } from '../common/decorators/current-user.decorator';
import { CreateReturnDto } from './create-return.dto';
import { ReturnsService } from './returns.service';
export declare class ReturnsController {
    private readonly returnsService;
    constructor(returnsService: ReturnsService);
    processReturn(currentUser: JwtUser, dto: CreateReturnDto): Promise<import("./asset-return.entity").AssetReturn>;
    findAll(currentUser: JwtUser): Promise<import("./asset-return.entity").AssetReturn[]>;
}
