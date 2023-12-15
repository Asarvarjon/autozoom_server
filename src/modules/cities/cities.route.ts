import { CreateCityDTO, UpdateCityDTO } from './dto/cities.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import CitysController from './cities.controller';
import validate from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import validateFiles from '../shared/middlewares/validateFiles';

export default class CityRoute implements Routes {
    public path = '/cities'; 
    public router = Router();
    public citiesController = new CitysController(); 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.citiesController.getAll);

        this.router.post(
            `${this.path}/`,
            protect,
            validateFiles('images'),
            validate(CreateCityDTO, 'body', true),
            this.citiesController.create  
        );

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.citiesController.delete);

        this.router.put(
            `${this.path}/:id`,
            protect,
            validate(UpdateCityDTO, 'body', true),
            validate(ValidateUuidDTO, 'params'),
            this.citiesController.update  
        );

        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.citiesController.getById);
    }
}
