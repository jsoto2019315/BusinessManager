'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'

import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import businessRoutes from '../src/business/business.routes.js';

class Sever {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.showUserPath = '/businessManager/v1/user/showUser';
        this.loginPath = '/businessManager/v1/login';

        this.addBusinessPath = '/businessManager/v1/business/addBusiness';
        this.getBusinessByYear = '/businessManager/v1/business/getBusiness';
        this.getBusinessAZ = '/businessManager/v1/business/getBusiness';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.showUserPath, userRoutes);
        this.app.use(this.loginPath, authRoutes);
        this.app.use(this.addBusinessPath, businessRoutes);
        this.app.use(this.getBusinessByYear, businessRoutes);
        this.app.use(this.getBusinessAZ, businessRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server is running on port', this.port);
        });
    }
}

export default Sever;