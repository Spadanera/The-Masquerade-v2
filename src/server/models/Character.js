import mongoose from 'mongoose';
import Capacity from './Capacity';

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
    playerId: mongoose.Schema.Types.ObjectId,
    player: String,
    alive: Boolean,
    picture: Buffer,
    startingExperience: { type: Number, default: 0 },
    totalExperience: { type: Number, default: 0 },
    spentExperience: { type: Number, default: 0 },
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
        Physical: [Capacity],
        Social: [Capacity],
        Mental: [Capacity]
    },
    skils: {
        talents: [Capacity],
        skills: [Capacity],
        knowledges: [Capacity]
    },
    discliplines: [Capacity],
    resonance: String,
    hunger: { type: Number, default: 10 },
    humanity: { type: Number, default: 10 },
    bloodPotency: { type: Number, default: 10 },
    advantages: [Capacity],
    flaws: [Capacity]
});

async function create (playerId, player) {
    let character = new this({
        playerId: playerId,
        player: player,
        attributes: {
            Physical: [
                Capacity.create("Steight"),
                Capacity.create("Dextrety"),
                Capacity.create("Stamina")
            ]
        }
    });
    return await character.save();
}

Object.assign(CharacterSchema.static, { Generations, Clans, create });

export default mongoose.model("Character", CharacterSchema);