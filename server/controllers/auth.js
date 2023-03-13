import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Registration user
export const registration = async (req, res) => {
    try {
        const {username, password} = req.body;
        const isUser = await User.findOne({username});

        if(isUser){
            return res.json({
                message: "Данный пользовотель уже существует"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUser = new User({
            username,
            password: hash
        });

        const token = jwt.sign({
            id: newUser._id,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        );

        await newUser.save();

        res.json({
            newUser,
            token,
            message: "Регистрация успешна"
        });
    }
    catch (error){
        res.json({
            message: "Error, not BD"
        });
    }
};

//Login user
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.json({
                message: "Такого пользователя не существует"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.json({
                message: "Логин или пароль не верные"
            });
        }

        const token = jwt.sign({
                id: user._id,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        );

        res.json({
            token,
            user,
            message: "Вы вошли"
        });
    }
    catch (error){
        res.json({
            message: "Ошибка при авторизации"
        })
    }
};

// Get user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.json({
                message: "Такого пользователя не существует"
            })
        }

        const token = jwt.sign({
                id: user._id,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        );

        res.json({user, token});
    }
    catch (error){
        res.json({
            message: "Нет доступа"
        })
    }
};