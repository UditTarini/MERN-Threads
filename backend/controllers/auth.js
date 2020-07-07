const User = require("../models/user")
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")
const {
    validationResult
} = require('express-validator');


exports.signup = (req, res) => {

    const errors = validationResult(req)
    // checking for errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].param + " " + errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {

            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }

        res.json({
            name: user.name,
            email: user.email,
            id: user._id

        })

    })
}

exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body

    const errors = validationResult(req)
    // checking for errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].param + " " + errors.array()[0].msg
        })
    }

    User.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            if (!user) {
                return res.status(400).json({
                    error: "User doesn't not exist"
                })
            }
            return res.status(400).json({
                error: "Something went wrong"
            })

        }


        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        // creating token and putting into cookies
        const auth_token = jwt.sign({
            _id: user._id
        }, process.env.SECRET)
        res.cookie("token", auth_token, {
            expire: new Date() * 100
        })

        // sending to frontend
        const {
            _id,
            name,
            email,
            role
        } = user
        return res.json({
            auth_token,
            user: {
                _id,
                name,
                email,
                role
            }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie("auth_token")
    res.json({
        message: "signout"
    })
}


// for protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(403).json({
            error: "Access denied"
        })

    }
    next()
}


exports.isAdmin = (req, res, next) => {
    let checker = req.profile.role === 0
    if (!checker) {
        return res.status(403).json({
            error: "Access denied, you are not an admin can do that"
        })

    }
    next()
}