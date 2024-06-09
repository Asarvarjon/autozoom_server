import { IDefaultQuery } from './../../shared/interface/query.interface';
import { ICreateTempPassword, ICreateUser, IUpdateUser } from './../interface/users.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 
import { v4 as uuidv4 } from 'uuid';


export default class UsersDao {

    async create({ first_name, phone_number, last_name, password }: ICreateUser) {
        return getFirst(
            await KnexService('users')
            .insert({
                user_id: uuidv4(),
                first_name, 
                phone_number,
                last_name,
                password
            })
            .returning('*')
        )
    }


    async update( userId: string, values: IUpdateUser) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
            .update({
                ...values
            })
            .returning('*')
        )
    }

     async verify( userId: string) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
            .update({
                is_active: true
            })
            .returning('*')
        )
    }

    async getAll(keyword: string = '', filters, sorts) {
        const {limit, offset, order, orderBy} = sorts 
        return await KnexService('users')
        .select([
            'users.user_id', 
            'users.created_at', 
            'users.is_active', 
            'users.is_blocked', 
            'users.birthdate', 
            'users.phone_number',   
            'users.image_src',   
            'users.address',   
            'users.gender',   
            'users.last_name',   
            'users.first_name',    
            KnexService.raw('jsonb_agg(distinct "purchases") as purchases') ,  
        ]) 
        .leftJoin(function(){
            this.select([
                'purchases.id', 
                'purchases.user_id', 
                'purchases.course_id',  
                KnexService.raw('jsonb_agg(distinct "courses") as courses') ,  
            ]) 
            .from('purchases')
            .as('purchases') 
            .leftJoin(function(){
                this.select([
                    'courses.id', 
                    'courses.name', 
                    'courses.description', 
                    'courses.category_id', 
                    'courses.total_hours', 
                    'courses.total_lessons',    
                    KnexService.raw('jsonb_agg(distinct "images") as images') ,  
                    KnexService.raw('jsonb_agg(distinct "course_authors") as course_authors') ,  
                ]) 
                .from('courses')
                .as('courses')  
                .innerJoin(function(){
                    this.select([
                        'images.id',
                        'images.src',
                        'images.size'
                    ])
                    .from('images')
                    .as('images')
                }, {'courses.image': 'images.id'}) 
                .leftJoin(function() {
                    this.select([
                        'course_authors.id as course_author_id',
                        'course_authors.course_id as course_id',
                        'course_authors.author_id as author_id', 
                        KnexService.raw('jsonb_agg(distinct "authors") as authors') , 
                    ])
                    .from('course_authors')
                    .as('course_authors')
                    .groupBy('course_authors.id')  
                    .leftJoin(function() {
                        this.select([
                            'authors.id',
                            'authors.user_id',  
                            KnexService.raw('jsonb_agg(distinct "users") as users') , 
                        ])
                        .from('authors')
                        .as('authors')
                        .groupBy('authors.id')  
                        .leftJoin(function() {
                            this.select([ 
                                'users.user_id',
                                'users.first_name',
                                'users.last_name',  
                                'users.image_src',
                            ])
                            .from('users')
                            .as('users')  
                            .groupBy('users.user_id')
                        }, {'users.user_id':'authors.user_id'})
                    }, {'authors.id':'course_authors.author_id'}) 
                }, {'courses.id':'course_authors.course_id'}) 
                .groupBy('courses.id')
            }, {'courses.id': 'purchases.course_id'}) 
            .groupBy('purchases.id')
        }, {'users.user_id': 'purchases.user_id'}) 
        .groupBy('users.user_id')
        .limit(limit)
        .offset(offset) 
        .orderBy(`users.${orderBy}`, order) 
        .whereILike('users.first_name', `%${keyword}%`)
        .whereILike('users.last_name', `%${keyword}%`)
        .andWhere(filters) 
    }

    async getById(userId: string) {
        return getFirst(
            await KnexService('users')
            .select([
                'users.user_id',   
                'users.phone_number',    
                'users.last_name',   
                'users.first_name',       
            ])  
            .groupBy('users.user_id')
            .where({'users.user_id': userId})
        )
    }

    async getCount(filters) { 
            return await KnexService('users')
            .count('users.user_id')
            .where(filters)
    } 

    async getByPhoneNumber(phone_number: string) {
        return getFirst(
            await KnexService('users')
            .where({phone_number: phone_number})
        )
    } 

    async deleteById(userId: string) {
        return await KnexService('users')
        .where({
            user_id: userId
        })
        .delete()
    } 

    async blockUser( userId: string ) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
            .update({
                is_blocked: true
            })
            .returning('*')
        )
    }

    async unBlockUser( userId: string ) {
        return getFirst(
            await KnexService('users')
            .where({user_id: userId})
            .update({
                is_blocked: false
            })
            .returning('*')
        )
    }

    async createTempPassword({ user_id, password }: ICreateTempPassword) {
        return await KnexService('temp_user_passwords')
        .insert({
            id: uuidv4(),
            user_id,
            password
        })
        .returning('*')
    }

    async getTempPassword( user_id: string ) {
        return getFirst(
            await KnexService('temp_user_passwords')
            .select('*')
            .where({user_id})
        )
    }

    async deleteUserTempPasswords( user_id: string ) {
        return await KnexService('temp_user_passwords')
        .where({
            user_id
        })
        .delete()
    }
}