const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserExercise = require('./UserExercise');
const DailyData = require('./DailyData');
const Food = require('./Food');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    weight: { type: Number, required: true },
    userGeneratedExercises: [UserExercise.schema],
    dailyData: [{ type: Schema.Types.ObjectId, ref: 'DailyData' }],
    password: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // the pw has changed (or first time) update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

module.exports = mongoose.model('User', userSchema);