import { CreateModelDTO, UpdateModelDTO } from './dto/models.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import ModelsController from './models.controller';
import validate from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import validateFiles from '../shared/middlewares/validateFiles';

export default class ModelRoute implements Routes {
    public path = '/models'; 
    public router = Router();
    public modelsController = new ModelsController(); 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.modelsController.getAll);

        this.router.post(
            `${this.path}/`,
            protect,
            validateFiles('images'),
            validate(CreateModelDTO, 'body', true),
            this.modelsController.create  
        );

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.modelsController.delete);

        this.router.put(
            `${this.path}/:id`,
            protect,
            validate(UpdateModelDTO, 'body', true),
            validate(ValidateUuidDTO, 'params'),
            this.modelsController.update  
        );

        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.modelsController.getById);
    }
}
