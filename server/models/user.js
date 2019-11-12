const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        max: [32, `Too long, 'Username' shouldn't increase 32 characters.`],
        min: [4, `Too long, 'Username' shouldn't increase 4 characters.`]
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        max: [32, `Too long, 'Email' shouldn't increase 32 characters.`],
        min: [4, `Too long, 'Email' shouldn't increase 4 characters.`]
    },
    password: {
        type: String,
        required: 'Email is required',
        max: [32, `Too long, 'Password' shouldn't increase 32 characters.`],
        min: [4, `Too long, 'Password' shouldn't increase 4 characters.`]
    },
    rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }]
});

userSchema.methods.isSamePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function (error, salt) {
        if (error) {
            console.log(`User ${user.username} cannot get salt.`);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                console.log(`User ${user.username} cannot get hash password.`);
            }
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);