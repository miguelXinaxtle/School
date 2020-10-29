import { Inject } from "typedi";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Authorized,
} from "routing-controllers";
import { IProduct, ProductService } from "../interfaces/product.service";

/**
 * @author          Miguel Angel Reyes Xinaxtle
 * @description     Administración de los productos de la tienda
 */
@JsonController("/product")
export class ProductController {
  private repository: IProduct;

  constructor(@Inject(ProductService) repository: IProduct) {
    this.repository = repository;
  }

  @Authorized(["Sistemas", "Gerente", "Venta"])
  @Get("/products")
  getAll() {
    return this.repository.getAll();
  }

  @Get("/product/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/product")
  post(@Body() user: any) {
    return "product added";
  }

  @Put("/product/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a product...";
  }

  @Delete("/product/:id")
  remove(@Param("id") id: number) {
    return "Removing product...";
  }
}
