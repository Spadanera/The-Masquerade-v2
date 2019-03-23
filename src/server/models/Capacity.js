import mongoose from 'mongoose';

let CapacitySchema = new mongoose.Schema({
    name: String,
    points: { type: Number, default: 0},
    speciality: String
});

export default mongoose.model("Capacity", CapacitySchema);