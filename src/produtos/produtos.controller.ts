import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ProdutosService } from './produtos.service.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}
  // POST /produtos
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
  })
  async criar(
    @Body() createProdutoDto: CreateProdutoDto,
    @Res() res: Response,
  ) {
    const doc = await this.produtosService.create(createProdutoDto);
    // Header Location: onde o novo recurso pode ser acessado.
    res.setHeader('Location', `/produtos/${doc._id}`);
    return res.json(doc);
  }
  // GET /produtos/:id
  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto pelo ID' })
  buscarPorId(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }
}
