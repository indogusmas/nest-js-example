import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateFunction, PaginateResult, paginator } from 'src/paginate/paginator';
import { ArticleEntity } from './entities/article.entity';
import { Prisma } from '@prisma/client';

const paginate : PaginateFunction = paginator({perPage: 10});

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService){}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({data: createArticleDto});
  }

  findAll({where,orderBy,page}:{
    where?: Prisma.ArticleWhereInput,
    orderBy?:Prisma.ArticleOrderByWithRelationInput,
    page?:number
  }):Promise<PaginateResult<ArticleEntity>> {
    return paginate(
      this.prisma.article,
      {
        where,
        orderBy
      },
      {
        page
      }
    )
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: {
        id: id,
      },
      include: {
        autor: true
      }
    });
  }

  findDrafts(){
    return this.prisma.article.findMany({where: {published:true}});
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {id : id},
      data: updateArticleDto
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {id: id}
    });
  }
}
