import { CreateLocationDTO, UpdateLocationDTO } from './dto/locations.dto';
import { ValidateUuidDTO } from '../shared/dto/params.dto';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import LocationsController from './locations.controller';
import validate from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import validateFiles from '../shared/middlewares/validateFiles';

export default class LocationRoute implements Routes {
    public path = '/locations'; 
    public router = Router();
    public locationsController = new LocationsController(); 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.locationsController.getAll);

        this.router.post(
            `${this.path}/`,
            protect,
            validateFiles('images'),
            validate(CreateLocationDTO, 'body', true),
            this.locationsController.create  
        );

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.locationsController.delete);

        this.router.put(
            `${this.path}/:id`,
            protect,
            validate(UpdateLocationDTO, 'body', true),
            validate(ValidateUuidDTO, 'params'),
            this.locationsController.update  
        );

        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.locationsController.getById);
    }
}
