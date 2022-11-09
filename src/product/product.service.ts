import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProduct(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        return await product.save();
    }

    async updateProduct(id: string, createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, createProductDto, { new: true });
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.productModel.findByIdAndRemove(id);
    }
}