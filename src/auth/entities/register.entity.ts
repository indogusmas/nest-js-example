import { ApiProperty } from "@nestjs/swagger"
import { User } from "@prisma/client"
import { UserEntity } from "src/users/entities/user.entity"

export class RegisterEntity{
  @ApiProperty()
  data: UserEntity
  
  @ApiProperty()
  access_token: string

}