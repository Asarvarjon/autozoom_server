import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/categories.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto'; 
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';   
import CategoriesController from './categories.controller';
import validate  from '../shared/middlewares/validate';
import protect from './../../modules/shared/middlewares/auth/protect';
import validateFiles from '../../modules/shared/middlewares/validateFiles';

export default class CategoryRoute implements Routes{
    public path = '/categories';
    public router = Router()
    public categoriesController = new CategoriesController()

    constructor() {
        this.initializeRoutes()
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.categoriesController.getAll);

        this.router.post(`${this.path}/`, protect, validateFiles('images'), validate(CreateCategoryDTO, 'body', true),   this.categoriesController.create);

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.categoriesController.delete);

        this.router.put(`${this.path}/:id`, protect, validate(UpdateCategoryDTO, 'body', true), validate(ValidateUuidDTO, 'params'), this.categoriesController.update);
        
        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.categoriesController.getById);
    }
}