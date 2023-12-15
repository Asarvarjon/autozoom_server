import { CreateBrandDTO, UpdateBrandDTO } from './dto/brands.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import BrandsController from './brands.controller';
import validate from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import validateFiles from '../shared/middlewares/validateFiles';

export default class BrandRoute implements Routes {
    public path = '/brands';
    public router = Router();
    public brandsController = new BrandsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.brandsController.getAll);

        this.router.post(
            `${this.path}/`,
            protect,
            validateFiles('images'),
            validate(CreateBrandDTO, 'body', true),
            this.brandsController.create
        );

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.brandsController.delete);

        this.router.put(
            `${this.path}/:id`,
            protect,
            validate(UpdateBrandDTO, 'body', true),
            validate(ValidateUuidDTO, 'params'),
            this.brandsController.update
        );

        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.brandsController.getById);
    }
}
