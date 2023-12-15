import { CreateCarDTO } from './dto/cars.dto';
import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface'; 
import { Request, Response, NextFunction } from 'express';  
import extractQuery from '../shared/utils/extractQuery';  
import Service from './cars.service';

export default class CarsController {
    private service = new Service() 

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {  
            const body: CreateCarDTO = req.body
            const data = await this.service.create(body, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'Car was created succesfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params 
            const data = await this.service.findOne(id)

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    }

    public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { query } = req;
            const { keyword }: ISearchQuery = query;
            const filters = extractQuery(query).filters
            const sorts = extractQuery(query).sorts

            const data = await this.service.getAll(keyword, filters, sorts);

            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction)=> {
        try {

            const { id } = req.params;
            await this.service.delete(id)
            
            res.status(200).json({
                success: true,
                message: "Car was deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try { 
            const { id } = req.params;  
            const body: CreateCarDTO = req.body
            
            const data = await this.service.update(id,body,  req['files'])
            
            res.status(200).json({
                success: true,
                data,
                message: "Car was updated successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}