import { CreateNewsDto } from './dto/news.dto';
 
import { IDefaultQuery } from '../shared/interface/query.interface'; 
import { isEmpty } from 'class-validator';  
import ErrorResponse from '../shared/utils/errorResponse';     
import generateSlug from '../shared/utils/generateSlug';
import NewsDao from './dao/news.dao';
import uploadFile from '../shared/utils/fileUpload'; 
import ImagesDAO from '../shared/modules/images/dao/images.dao';

export default class NewsService {
    private newsDao = new NewsDao() 
    private imagesDao = new ImagesDAO()  

    async create(data: CreateNewsDto, files) { 
        

        let src: string;
        if(!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            src = uploadedImage.src
        }



        const created = await this.newsDao.create({
                ...data,
                image_src: src,
        }) 

        return created
    }

    async findOne(id: string) {
        const data = await this.newsDao.getById(id); 

        if(!data) {
            throw new ErrorResponse(404, 'Not found!')
        }

        return data
    }

    async getAll(keyword: string, filters: IDefaultQuery, sorts: IDefaultQuery) {
        const data = await this.newsDao.getAll(keyword, filters, sorts);
       
        
        return data
    }


    async getArchives( ) {
        let archives = await this.newsDao.getArchives();
        const archivesByYear = {}; 
        
        archives.forEach((news) => {
          const monthYear = news.month_year;
          if (!archivesByYear[monthYear]) {
            archivesByYear[monthYear] = [];
          }
          archivesByYear[monthYear].push({
            id: news.id,
            image_src: news.image_src,
            title_ru: news.title_ru,
            title_en: news.title_en,
            title_uz: news.title_uz,
            text_ru: news.text_ru,
            text_en: news.text_en,
            text_uz: news.text_uz,
            created_at: news.created_at,
          });
        });
    
        return archivesByYear;
    }

    async delete(id: string) {
        await this.newsDao.deleteById(id)
    }

    async update(id: string, data: CreateNewsDto, files) {
        const found = await this.newsDao.getById(id)

        if(isEmpty(found)) {
            throw new ErrorResponse(404, ' not found!')
        }  
        
        let image_src = found.image_src

        if(!isEmpty(files)) {
            const images = uploadFile(files['images'], 'images');
            const uploadedImage = await this.imagesDao.create(images[0])
            image_src = uploadedImage.src
        } 

        const updated = await this.newsDao.update(id, {...data, image_src})

        return updated
    } 
}