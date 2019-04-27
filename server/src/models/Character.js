import mongoose from 'mongoose';

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
}

let CharacterSchema = new mongoose.Schema({
    name: String,
    userId: mongoose.Schema.Types.ObjectId,
    playerId: mongoose.Schema.Types.ObjectId,
    alive: Boolean,
    picture: String,
    startingExperience: { type: Number, default: 0 },
    totalExperience: { type: Number, default: 0 },
    spentExperience: { type: Number, default: 0 },
    mortal: {
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
    resonance: String,
    hunger: { type: Number, default: 0 },
    humanity: { type: Number, default: 10 },
    bloodPotency: { type: Number, default: 10 },
    advantages: [Capacity],
    flaws: [Capacity]
});

CharacterSchema.statics.createCapacities = (names) => {
    let capacities = [];
    for (let i = 0; i < names.length; i++) {
        capacities.push({
            name: names[i]
        });
    }
    return capacities;
}

export default mongoose.model("Character", CharacterSchema);