import mongoose from 'mongoose';

const CharacterStatuses = Object.freeze({
    Alive: 'alive',
    Torpor: 'torpor',
    LastDeath: 'lastdeath'
});

const Capacity = {
    name: String,
    points: { type: Number, default: 0},
    fightingPoint: { type: Number, default: 0},
    speciality: String
};

const Discipline = {
    name: String,
    points: { type: Number, default: 0},
    powers: [{
        level: Number,
        power: String
    }]
};

const Background = {
    name: String,
    points: { type: Number, default: 0 }
};

let CharacterSchema = new mongoose.Schema({
    name: String,
    userId: mongoose.Schema.Types.ObjectId,
    chronicleId: mongoose.Schema.Types.ObjectId,
    alive: { type: String, enum: Object.values(CharacterStatuses), default: CharacterStatuses.Alive },
    picture: String,
    startingExperience: { type: Number, default: 0 },
    totalExperience: { type: Number, default: 0 },
    spentExperience: { type: Number, default: 0 },
    mortal: {
        trueAge: Number,
        apparentAge: Number,
        dateOfBirth: String,
        dateOfDeath: String,
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
        clan: String,
        generation: String
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
        physical: [Capacity],
        social: [Capacity],
        mental: [Capacity]
    },
    skills: {
        talents: [Capacity],
        skills: [Capacity],
        knowledges: [Capacity]
    },
    disciplines: [Discipline],
    backgrounds: [Background],
    resonance: String,
    hunger: { type: Number, default: 0 },
    humanity: { type: Number, default: 10 },
    bloodPotency: { type: Number, default: 10 },
    advantages: [Capacity],
    flaws: [Capacity],
    updateAt: { type: Date, default: Date.now },
    refuge: String
});

CharacterSchema.statics.createCapacities = (names) => {
    let capacities = [];
    for (let i = 0; i < names.length; i++) {
        capacities.push({
            name: names[i]
        });
    }
    return capacities;
};

Object.assign(CharacterSchema.static, { CharacterStatuses });

export default mongoose.model("Character", CharacterSchema);