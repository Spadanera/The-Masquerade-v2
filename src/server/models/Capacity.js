import mongoose from 'mongoose';

let CapacitySchema = new mongoose.Schema({
    name: String,
    points: { type: Number, default: 0},
    speciality: String
});

function create(name) {
    return new this({
        name
    });
}

Object.assign(CapacitySchema.statics, { create });

export default CapacitySchema;