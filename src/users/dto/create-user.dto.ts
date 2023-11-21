import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
