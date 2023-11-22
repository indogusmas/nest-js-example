import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginateFunction, PaginateResult, paginator } from 'src/paginate/paginator';
import { ArticleEntity } from './entities/article.entity';
import { Prisma } from '@prisma/client';


@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService){}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({data: createArticleDto});
  }

  findAll({where,orderBy,page,include}:{
    where?: Prisma.ArticleWhereInput,
    orderBy?:Prisma.ArticleOrderByWithRelationInput,
    page?:number,
    include?: Prisma.ArticleInclude,
  }):Promise<PaginateResult<ArticleEntity>> {
    const paginate : PaginateFunction = paginator({perPage: 10,page: 1});
    return paginate(
      this.prisma.article,
      page,
      {
        where,
        orderBy,
        include,
      },
      
    )
  }

  findAllv2(){
    return this.prisma.article.findMany({
      where: {
        id: 2
      },
      include: {
        autor: true
      }
    })
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
