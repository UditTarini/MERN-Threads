var User = require("../models/user")
const user = require("../models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found"
            })
        }
        // storing user into profile obj of req
        req.profile = user
        next()
    })
}

// to get user from req.profile
exports.getUser = (req, res) => {

    // geting rid of unnescessary fields
    req.profile.salt = undefined
    req.profile.encrypted_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined

    return res.json(req.profile)

}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        // find
        {
            _id: req.profile._id
        },
        // what to update
        {
            $set: req.body
        },

        { // cuz we r updating
            new: true,
            // for deprication warn
            useFindAndModify: false
        },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Updattion denied"
                })
            }

            // geting rid of unnescessary fields
            user.salt = undefined
            user.encrypted_password = undefined
            user.createdAt = undefined
            user.updatedAt = undefined

            res.json(user)
        }
    )
}