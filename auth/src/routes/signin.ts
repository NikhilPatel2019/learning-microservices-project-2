import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .isLength({min: 4, max: 20})
            .withMessage('You must supply a password')
    ], 
    validateRequest,
    async (req: Request ,res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(!existingUser){
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if(!passwordsMatch){
            throw new BadRequestError('Invalid credentials');
        }

        const userJwt = jwt.sign(
                {
                    id: existingUser.id,
                    email: existingUser.email
                },
                'asdf'
            );
              
            req.session = {
                jwt: userJwt
            };      
        
            res.status(201).send(existingUser);

    });

export { router as signinRouter };