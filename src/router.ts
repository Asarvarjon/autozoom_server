import { Router } from 'express';    
import CategoryRoute from './modules/categories/category.route'; 
import AuthRoute from './modules/auth/auth.route';  
import NewsRoute from './modules/news/news.route'; 
import BrandRoute from './modules/brands/brands.route';
import ModelRoute from './modules/models/models.route';
import CityRoute from './modules/cities/cities.route';
import LocationRoute from './modules/locations/locations.route';
import CarsRoute from './modules/cars/cars.route';

const router = Router()

const categoriesRoute = new CategoryRoute()    
const authRoute = new AuthRoute()       
const newsRoute = new NewsRoute() 
const modelsRoute = new ModelRoute() 
const brandRoute = new BrandRoute()
const locationRoute = new LocationRoute()
const cityRoute = new CityRoute()
const carsRoute = new CarsRoute()



router.use("/", categoriesRoute.router)      
router.use("/", authRoute.router)       
router.use("/", newsRoute.router)    
router.use("/", brandRoute.router)    
router.use("/", modelsRoute.router) 
router.use("/", cityRoute.router)    
router.use("/", locationRoute.router)   
router.use("/", carsRoute.router)    


export default router