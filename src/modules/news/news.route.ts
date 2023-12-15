 
import { ValidateUuidDTO } from '../shared/dto/params.dto'; 
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';   
import validate  from '../shared/middlewares/validate';
import protect from '../shared/middlewares/auth/protect';
import NewsController from './news.controller'; 
import { CreateNewsDto } from './dto/news.dto';


export default class NewsRoute implements Routes{
    public path = '/news';
    public router = Router()
    public newsController = new NewsController()

    constructor() {
        this.initializeRoutes()
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/`, this.newsController.getAll);



        this.router.post(`${this.path}/`, protect, validate(CreateNewsDto, 'body', true),   this.newsController.create);

        this.router.get(`${this.path}/archives`, this.newsController.getArchives);


        this.router.delete(`${this.path}/:id`, protect, validate(ValidateUuidDTO, 'params'), this.newsController.delete);

        this.router.put(`${this.path}/:id`, protect, validate(CreateNewsDto, 'body', true), validate(ValidateUuidDTO, 'params'), this.newsController.update);
        
        this.router.get(`${this.path}/:id`, validate(ValidateUuidDTO, 'params'), this.newsController.getById);
    }
}