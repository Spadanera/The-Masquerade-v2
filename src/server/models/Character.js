import mongoose from 'mongoose';
import { schema as Capacity } from './Capacity';

const Generations = Object.freeze({
    First: "1st",
    Second: "2nd",
    Third: "3rd",
    Fourth: "4th",
    Fifth: "5th",
    Sixth: "6th",
    Seventh: "7th",
    Eigth: "8th",
    Ninth: "9th",
    Tenth: "10th",
    Eleventh: "11th",
    Twelfth: "12th",
    Thirteenth: "13th",
    Fourteenth: "14th"
});

const Clans = Object.freeze({
    Bruja: "Bruja",
    Gangrel: "Gangrel",
    Malkavian: "Malkavian",
    Nosferatu: "Nosferatu",
    Toreador: "Toreador",
    Tremere: "Tremere",
    Ventrue: "Ventrue",
    Caitiff: "Caitiff"
});

let CharacterSchema = new mongoose.Schema({
    name: String,
    player: mongoose.Schema.Types.ObjectId,
    alive: Boolean,
    picture: Buffer,
    startingExperience: { type: Number, default: 0},
    totalExperience: { type: Number, default: 0},
    spentExperience: { type: Number, default: 0},
    characteristics: {
        trueAge: Number,
        apparentAge: Number,
        dateOfBirth: Date,
        dateOfDeath: Date,
        apparence: String,
        distinguishingFeatures: String,
        story: String,
    },
    mainInformation: {
        sire: String,
        concept: String,
        ambition: String,
        desire: String,
        predator: String,
        clan: { type: String, enum: Object.values(Clans) },
        generation: { type: String, enum: Object.values(Generations) }
    },
    health: {
        pool: { type: Number, default: 10 },
        superficialDamage: { type: Number, default: 0 },
        aggravatedDamage: { type: Number, default: 0 },
    },
    willPower: {
        pool: { type: Number, default: 10 },
        spent: { type: Number, default: 0 }
    },
    attributes: {
        Physical: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
        Social: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
        Mental: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }]
    },
    skils: {
        talents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
        knowledges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }]
    },
    discliplines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
    resonance: String,
    hunger: { type: Number, default: 10 },
    humanity: { type: Number, default: 10 },
    bloodPotency: { type: Number, default: 10 },
    advantages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
    flaws: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }]
});

Object.assign(CharacterSchema.static, { Generations });
Object.assign(CharacterSchema.static, { Clans });

export default mongoose.model("Character", CharacterSchema);