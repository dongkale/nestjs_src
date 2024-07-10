import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';
import { Response } from 'express';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = {
      title: 'Products - Online Store',
      subtitle: 'List of products',
      products: await this.productsService.findAll(),
    };
    return {
      viewData: viewData,
    };
  }

  // async index() {
  //   const viewData = [];
  //   viewData['title'] = 'Products - Online Store';
  //   viewData['subtitle'] = 'List of products';
  //   viewData['products'] = await this.productsService.findAll();
  //   return {
  //     viewData: viewData,
  //   };
  // }

  @Get('/:id')
  async show(@Param() id: string, @Res() response: Response) {
    const product = await this.productsService.findOne(id);
    if (product === undefined) {
      return response.redirect('/products');
    }
    // const viewData = {};
    // viewData['title'] = product.getName() + ' - Online Store';
    // viewData['subtitle'] = product.getName() + ' - Product Information';
    // viewData['product'] = product;

    const viewData = {
      title: product.getName() + ' - Online Store',
      subtitle: product.getName() + ' - Product Information',
      products: product,
    };

    return response.render('products/show', { viewData: viewData });
  }
}
