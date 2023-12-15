import { Router } from 'express'; 
import { Routes } from '../../shared/interface/routes.interface';
import ResourcesController from './access_modules.controller';

export default class ResourcesRoute implements Routes {
  public path = '/resources/';
  public router = Router();
  public resourcesController = new ResourcesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() { 
    this.router.get(`${this.path}`,  this.resourcesController.getAll);    
  }
}
