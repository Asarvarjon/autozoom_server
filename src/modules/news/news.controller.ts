import { CreateNewsDto } from './dto/news.dto';
import { ISearchQuery, IDefaultQuery } from '../shared/interface/query.interface'; 
import { Request, Response, NextFunction } from 'express';  
import extractQuery from '../shared/utils/extractQuery';  
import NewsService from './news.service';

export default class NewsController {
    private newsService = new NewsService() 

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {  
            const body: CreateNewsDto = req.body
            const data = await this.newsService.create(body, req['files']);

            res.status(201).json({
                success: true,
                data,
                message: 'News was created succesfully!'
            })
        } catch (error) {
            next(error)
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params 
            const data = await this.newsService.findOne(id)

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    }

    public getArchives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try { 
            const data = await this.newsService.getArchives()

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

            const data = await this.newsService.getAll(keyword, filters, sorts);

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
            await this.newsService.delete(id)
            
            res.status(200).json({
                success: true,
                message: "News was deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction)=> {
        try { 
            const { id } = req.params;  
            const body: CreateNewsDto = req.body
            
            const data = await this.newsService.update(id,body,  req['files'])
            
            res.status(200).json({
                success: true,
                data,
                message: "News was updated successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}