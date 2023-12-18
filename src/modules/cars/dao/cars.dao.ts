import { IDefaultQuery } from '../../shared/interface/query.interface'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 
import { ICreateCar } from '../interface/cars.interface';


export default class CarsDao { 
    async create(data: ICreateCar) {
        return getFirst(
            await KnexService('cars')
            .insert(data)
            .returning('*')
        )
    }


    async update( id: string, values: ICreateCar) {
        return getFirst(
            await KnexService('cars')
            .where({id: id})
            .update({
                ...values
            })
            .returning('*')
        )   
    }

    async getAll( keyword: string = '', filters, sorts) {
        const {limit, offset, order, orderBy} = sorts 
        const query = KnexService('cars') 
        .select([
            "cars.*", 
            KnexService.raw(`jsonb_agg(distinct car_images) as car_images`),
            "cities.name as city.name", 
            "cities.id as city.id",  
            "cities.slug as city.slug",  
            "cities.image_src as city.image_src",  
            "locations.name as location.name", 
            "locations.id as location.id",  
            "locations.slug as location.slug",  
            "locations.image_src as location.image_src", 
            "categories.name_en as category.name_en",
            "categories.id as category.id",
            "categories.name_ru as category.name_ru",
            "brands.id as brand.id",
            "brands.title as brand.title",
            "brands.image_src as brand.image_src",
            "models.id as model.id",
            "models.name as model.name",
            "models.slug as model.slug",


        ])
        .leftJoin('cities', 'cars.city_id', 'cities.id') 
        .leftJoin('locations', 'cars.location_id', 'locations.id') 
        .leftJoin('categories', 'cars.category_id', 'categories.id') 
        .leftJoin('brands', 'cars.brand_id', 'brands.id') 
        .leftJoin('models', 'cars.model_id', 'models.id') 
        .leftJoin(function () {
            this.select([
                'car_images.car_id',
                "image.src as image.src"
            ])
            .from('car_images') 
            .leftJoin({image: "images"}, { 'car_images.image_id': 'image.id' })
            .groupBy('car_images.id', "image.id")
            .as('car_images')
        }, { 'cars.id': 'car_images.car_id' })
        .groupBy('cars.id', 'cities.id', 'locations.id', 'models.id', 'brands.id', 'categories.id')  
         
        for (const column in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, column)) {
                query.andWhere(`cars.${column}`, filters[column]);
            }
        }
    
        return await query;
    
    }

    async getById(id: string) {
        return getFirst( await KnexService("cars") 
        .select([
            "cars.*", 
            KnexService.raw(`jsonb_agg(distinct car_images) as car_images`),
            "cities.name as city.name", 
            "cities.id as city.id",  
            "cities.slug as city.slug",  
            "cities.image_src as city.image_src",  
            "locations.name as location.name", 
            "locations.id as location.id",  
            "locations.slug as location.slug",  
            "locations.image_src as location.image_src", 
            "categories.name_en as category.name_en",
            "categories.id as category.id",
            "categories.name_ru as category.name_ru",
            "brands.id as brand.id",
            "brands.title as brand.title",
            "brands.image_src as brand.image_src",
            "models.id as model.id",
            "models.name as model.name",
            "models.slug as model.slug",


        ])
        .leftJoin('cities', 'cars.city_id', 'cities.id') 
        .leftJoin('locations', 'cars.location_id', 'locations.id') 
        .leftJoin('categories', 'cars.category_id', 'categories.id') 
        .leftJoin('brands', 'cars.brand_id', 'brands.id') 
        .leftJoin('models', 'cars.model_id', 'models.id') 
        .leftJoin(function () {
            this.select([
                'car_images.car_id',
                "image.src as image.src"
            ])
            .from('car_images') 
            .leftJoin({image: "images"}, { 'car_images.image_id': 'image.id' })
            .groupBy('car_images.id', "image.id")
            .as('car_images')
        }, { 'cars.id': 'car_images.car_id' })
        .groupBy('cars.id', 'cities.id', 'locations.id', 'models.id', 'brands.id', 'categories.id')  
        .where({"cars.id": id}) 
        )
        // .groupBy('cars.id')

    }
 

    async  groupedByCategory() { 
          const groupedData = await KnexService('categories')
            .select([
              'categories.id as category_id',
              'categories.name_en as category_name_en',
              'categories.name_ru as category_name_ru',
              // Add other category columns as needed
            ])
            .leftJoin('cars', 'categories.id', 'cars.category_id')
            .groupBy('categories.id')
            .orderBy('categories.id');
      
          const result = await Promise.all(groupedData.map(async (category) => {
            const { category_id, category_name_en, category_name_ru, ...restCategoryData } = category;
      
            const cars = await KnexService('cars')
  .select([
    "cars.*",
    "brands.id as brand.id",
    "brands.title as brand.title",
    "brands.image_src as brand.image_src",
    "models.id as model.id",
    "models.name as model.name",
    "models.slug as model.slug",
    KnexService.raw(`jsonb_agg(distinct car_images) as car_images`),
  ])
  .leftJoin('cities', 'cars.city_id', 'cities.id')
  .leftJoin('locations', 'cars.location_id', 'locations.id')
  .leftJoin('brands', 'cars.brand_id', 'brands.id')
  .leftJoin('models', 'cars.model_id', 'models.id')
  .leftJoin(function () {
    this.select([
      'car_images.car_id',
      "image.src as image.src"
    ])
      .from('car_images')
      .leftJoin({ image: "images" }, { 'car_images.image_id': 'image.id' })
      .groupBy('car_images.id', "image.id")
      .as('car_images')
  }, { 'cars.id': 'car_images.car_id' })
  .leftJoin('categories', 'cars.category_id', 'categories.id')  // Add this line
  .groupBy('cars.id', 'cities.id', 'locations.id', 'models.id', 'brands.id', 'categories.id')  // Update this line
  .where('cars.category_id', category_id);
      
            const categoryData = {
              id: category_id,
              name_en: category_name_en,
              name_ru: category_name_ru,
              ...restCategoryData,
            };
      
            return {
              ...categoryData,
              cars,
            };
          }));
 
      
          return  result
        
        
      }
      
      
      
      
    async deleteById(id: string) {
        return await KnexService('cars')
        .where({
            id: id
        })
        .delete()
    }  

    async deleteBlogImages(id: string) {
        return await KnexService('car_images')
        .where({
            blog_id: id
        })
        .delete()
    }  

    async createBlogImage(data){
        return getFirst(
            await KnexService("car_images")
                .insert(data)
                .returning("*")
        )
    }

    
}