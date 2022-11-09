import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    async getAll(@Res() res) {
        const products = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({ products });
    }
    
    @Get('/:id')
    async getOne(@Res() res, @Param('id') id ) {
        const product = await this.productService.getProduct(id);
        return res.status(HttpStatus.OK).json(product);
    }
    
    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDto: CreateProductDto) {
        const product = await this.productService.createProduct(createProductDto)
        return res.status(HttpStatus.OK).json({ message: 'Product created successfully.', product });
    }
    
    @Put('/update')
    async update(@Res() res, @Body() updateProduct: CreateProductDto, @Query('id') id) {
        const product = await this.productService.updateProduct(id, updateProduct);
        return res.status(HttpStatus.OK).json({message:'Product updated successfully', product });
    }
    
    @Delete('/delete')
    async remove(@Res() res, @Query('id') id) {
        const product = await this.productService.deleteProduct(id)
        return res.status(HttpStatus.OK).json({ message: 'Product removed successfully.', product})
    }
}