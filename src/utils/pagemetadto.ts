import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameters } from "./pagemetadtoparameters";
import { it } from "node:test";

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;
  
  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({
    pageOptionDto, itemCount
  }: PageMetaDtoParameters){
    this.page = pageOptionDto.page;
    this.take = pageOptionDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = (this.page > 1) ? true : false;
    this.hasNextPage = ((this.page * this.take) < this.itemCount) ? true : false;
  }
}