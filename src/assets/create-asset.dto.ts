import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AssetStatus } from '../common/enums/asset-status.enum';

export class CreateAssetDto {
  @IsNotEmpty()
  assetCode: string;

  @IsNotEmpty()
  assetName: string;

  @IsNotEmpty()
  assetType: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  serialNumber?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsOptional()
  @IsDateString()
  warrantyEndDate?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  conditionNote?: string;

  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @IsOptional()
  remarks?: string;
}
