const User = require('../models/user');
const JWT = require('jsonwebtoken');
const config = require('../config/dev');

exports.authMiddleware = function(req, res, next) {
    const accessToken = req.headers.accessToken;
    if (accessToken) {
        const user = parseToken(accessToken);
        User.findById(user.userId, function(error, user) {
            if (error || !user) {
                return res.status(401).json(
                    [
                        { 
                            title: 'Authorization Error.',
                            detail: `User is not authorized.`,
                        }
                    ]
                ); 
            }
            res.locals.user = user;
            next();
        });
    } else {
        return res.status(401).json(
            [
                { 
                    title: 'Authorization Error.',
                    detail: `User is not authorized.`,
                }
            ]
        ); 
    }
}

function parseToken(accessToken) {
    const bearerArr = accessToken.split(' ');
    if (!Array.isArray(bearerArr) || bearerArr.length < 2) {
        return '';
    }
    const code = bearerArr[1];
    const decoded = JWT.verify(code, config.AUTH_SECRET);
}

exports.register = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    if (!username || !email) {
        return res.status(422).json(
            [
                { 
                    title: 'Wrong credentials.',
                    detail: `Cannot register user with username: '${username}' and email '${email}'.`,
                }
            ]
        );
    }

    if (!password || !passwordConfirmation || password !== passwordConfirmation) {
        return res.status(422).json(
            [
                { 
                    title: 'Invalid Password.',
                    detail: `Provide correct 'Password' and 'Confirmation'`,
                }
            ]
        );
    }
    const user = new User({ username, email, password });
    try {
        await user.save();
        const accessToken = JWT.sign(
            { userId: user._id, username: user.username },
            config.AUTH_SECRET,
            { expiresIn: 3600 }
        );
        res.status(200).json({ accessToken });
    } catch (e) {
        res.status(401).json(
            [
                { 
                    title: 'Invalid Email.',
                    detail: `Choose different email.`,
                }
            ]
        );
    }
}

exports.auth = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(422).json(
            [
                { 
                    title: 'Wrong credentials.',
                    detail: `Check email and password..`,
                }
            ]
        );
    }
    try {
        const user = await User.findOne({ email });
        const isSamePassword = user.isSamePassword(password);
        if (!isSamePassword) {
            res.status(422).json(
                [
                    { 
                        title: 'Wrong credentials.',
                        detail: `Check email and password..`,
                    }
                ]
            );
        }
        const accessToken = JWT.sign(
            { userId: user._id, username: user.username },
            config.AUTH_SECRET,
            { expiresIn: 3600 }
        );
        res.status(200).json({ accessToken });
    } catch (e) {
        res.status(401).json(
            [
                { 
                    title: 'Wrong credentials.',
                    detail: `Check email and password..`,
                }
            ]
        );
    }
}

