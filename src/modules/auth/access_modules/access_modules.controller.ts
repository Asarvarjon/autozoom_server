 import { NextFunction, Request, Response } from 'express'; 
import ResourcesService from './access_modules.service';

class ResourcesController {
  public resourcesService = new ResourcesService(); 
  
  public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const data = await this.resourcesService.getAll();

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}


}

export default ResourcesController;
