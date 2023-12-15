import { ISearchQuery, IDefaultQuery } from './../shared/interface/query.interface';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/categories.dto'; 
import { Request, Response, NextFunction } from 'express';  
import extractQuery from '../shared/utils/extractQuery'; 
import CategoriesService from './categories.service';
import ErrorResponse from '../../modules/shared/utils/errorResponse';

export default class CategoriesController {
    private categoriesService = new CategoriesService() 

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryData: CreateCategoryDTO = req.body;   
            const data = await this.categoriesService.create(categoryData, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'Category was created succesfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params 
            const data = await this.categoriesService.findOne(id)

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

            const data = await this.categoriesService.getAll(keyword, filters, sorts);

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
            const data = await this.categoriesService.findOne(id)

            if(!data) {
                throw new ErrorResponse(400, 'Not found')
            }

            await this.categoriesService.delete(id)
            
            res.status(200).json({
                success: true,
                message: "Category was deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const categoryData: UpdateCategoryDTO = req.body;
            const { id } = req.params;  
            
            const data = await this.categoriesService.update(id, categoryData, req['files'])
            
            res.status(200).json({
                success: true,
                data,
                message: "Category was updated successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}