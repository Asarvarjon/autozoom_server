 
import { ValidateUuidDTO } from '../shared/dto/params.dto'; 
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';   
import validate  from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import Controller from './cars.controller'; 
import { CreateCarDTO, UpdateCarDTO } from './dto/cars.dto';
import validateFiles from '../shared/middlewares/validateFiles';


export default class CarsRoute implements Routes{
    public path = '/cars';
    public router = Router()
    public controller = new Controller()

    constructor() {
        this.initializeRoutes()
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.controller.getAll);

        this.router.get(`${this.path}/category`, this.controller.getGroupedByCategory);


        this.router.post(`${this.path}/`, protect, validate(CreateCarDTO, 'body', true), validateFiles('images'), this.controller.create);

        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.controller.delete);

        this.router.put(`${this.path}/:id`, protect, validate(UpdateCarDTO, 'body', true), validate(ValidateUuidDTO, 'params'), this.controller.update);
        
        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.controller.getById);
    }
}