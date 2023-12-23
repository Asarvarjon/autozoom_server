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

    async  filterById(query, columnName, values) {
        if (values) {
            if (Array.isArray(values)) {
                query.whereIn(columnName, values);
            } else {
                query.where(columnName, values);
            }
        }
    }
    
    async getAll(keyword: string = '', filters, sorts) {
        const { limit, offset, order, orderBy } = sorts;
        const query = KnexService('cars')
            .select([
                "cars.*",
                KnexService.raw(`jsonb_agg(distinct car_images) as car_images`),
                KnexService.raw("price_in_aed::numeric * 3 as three_days_price"),
                KnexService.raw("price_in_aed::numeric * 2 as two_days_price"),
                KnexService.raw("price_in_aed::numeric * 4 as four_days_price"),
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
                    'car_images.created_at',
                    'car_images.is_main',
                    "image.src as image.src", 
                ])
                    .from('car_images')
                    .leftJoin({ image: "images" }, { 'car_images.image_id': 'image.id' })
                    .groupBy('car_images.id', "image.id")
                    .orderBy('car_images.created_at', 'desc') 
                    .as('car_images')
            }, { 'cars.id': 'car_images.car_id' })
            .groupBy('cars.id', 'cities.id', 'locations.id', 'models.id', 'brands.id', 'categories.id');
    
        await this.filterById(query, 'cars.city_id', filters.city_id);
        await this.filterById(query, 'cars.location_id', filters.location_id);
        await this.filterById(query, 'cars.category_id', filters.category_id);
        await this.filterById(query, 'cars.brand_id', filters.brand_id);
        await this.filterById(query, 'cars.model_id', filters.model_id);

        if (keyword) {
            query.andWhere(function() {
                this.where('models.name', 'ilike', `%${keyword}%`)
                    .orWhere('brands.title', 'ilike', `%${keyword}%`);
            });
        }

       
        if (filters.three_days_price !== undefined) {
            query.whereRaw('price_in_aed::numeric * 3 <= ?', [filters.three_days_price]);
        }
    
        if (filters.two_days_price) {
            await query.whereRaw('price_in_aed::numeric * 2 <= ?', [filters.two_days_price]);
        }

        if (filters.four_days_price) {
            await query.whereRaw('price_in_aed::numeric * 4 <= ?', [filters.four_days_price]);
        }

        if (filters.deposit !== undefined) {
            await query.where('cars.deposit', filters.deposit);
        }

        if (filters.all_inclusive) { 
            await query.whereBetween('cars.price_in_aed', [4000, 5000]);
        }

        if (filters.rent_ferrari) {
            await query.where('brands.title', 'ilike', 'Ferrari');
        }
    
    
    
        return await query.orderBy(orderBy, order).offset(offset).limit(limit);
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
            .where({is_main: false})
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
      "image.src as image.src",
      'car_images.created_at',
      'car_images.is_main',
    ])
      .from('car_images')
      .leftJoin({ image: "images" }, { 'car_images.image_id': 'image.id' })
      .groupBy('car_images.id', "image.id")
      .orderBy('car_images.created_at', 'desc') 
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

    async deleteCarMainImage(id: string) {
        return await KnexService('car_images')
        .where({
            car_id: id,
            is_main: true
        })
        .delete()
    } 

    async deleteBlogImages(id: string) {
        return await KnexService('car_images')
        .where({
            car_id: id
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