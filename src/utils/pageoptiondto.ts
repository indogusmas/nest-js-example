import { ApiPropertyOptional } from "@nestjs/swagger";
import { Order } from "./constants";
import { IsEnum, IsInt, IsOptional, MIN, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PageOptionDto {
  @ApiPropertyOptional({enum: Order, default: Order.ASC})
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number{
    return (this.page - 1) * this.take;
  }
}