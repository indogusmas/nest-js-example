import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto)
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll({
        where: {},
        orderBy: {createdAt: 'asc'},
        page: 1,
        include: {autor:true}
      }
      );
   // const articles2 = await this.articlesService.findAllv2();
    console.log(articles);
   // const temp =  articles.data.map((article) => new ArticleEntity(article))

   // console.log(temp);
    return articles;
  }

  @Get('draft')
  @ApiCreatedResponse({type: ArticleEntity })
  findDrafts(){
    return this.articlesService.findDrafts();
  }


  @Get(':id')
  @ApiCreatedResponse({type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const articel = await this.articlesService.findOne(id);
    if (articel == null) {
      throw new NotFoundException('Articel not found');
    }
    return articel;
  }

  @Patch(':id')
  @ApiCreatedResponse({type: ArticleEntity })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({type: ArticleEntity })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
