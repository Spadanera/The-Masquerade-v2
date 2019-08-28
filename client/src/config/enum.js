export const clans = [
    "Bruja",
    "Gangrel",
    "Malkavian",
    "Nosferatu",
    "Toreador",
    "Tremere",
    "Ventrue",
    "Caitiff"
];
export const generations = [
    "14th",
    "13th",
    "12th",
    "11th",
    "10th",
    "9th",
    "8th",
    "7th",
    "6th",
    "5th",
    "4th",
    "3rd",
    "2nd",
    "1st"
];
export const disciplines = [
    {
        key: "Animalism",
        label: "Animalism",
        powers: [
            [
                { key: "BondFamulus", label: "Bond Famulus" },
                { key: "SenseTheBest", label: "Sense the Best" }
            ],
            [
                { key: "FeralWhisper", label: "Feral Whisper" }
            ],
            [
                { key: "AnimalSucculence", label: "Animal Succulence" },
                { key: "QuellTheBeast", label: "Quell the Beast" },
                { key: "UnlivingHive", label: "Unliving Hive" }
            ],
            [
                { key: "AnimalDominion", label: "Animal Dominion" }
            ],
            [
                { key: "DrawingOutTheBest", label: "Drawing out the Best" }
            ]
        ]
    },
    { 
        key: "Auspex", 
        label: "Auspex",
        powers: [
            [
                { key: "HeightenedSense", label: "Heightened Sense" },
                { key: "SenseTheUnseen", label: "Sense the Unseen" }
            ],
            [
                { key: "Premonition", label: "Premonition" }                
            ],
            [
                { key: "SkryTheSoul", label: "Skry the Soul" },
                { key: "ShareTheSense", label: "Share the Sense" }
            ],
            [
                { key: "SpritsTouch", label: "Sprit's Touch" }
            ],
            [
                { key: "Clairvoyance", label: "Clairvoyance" },
                { key: "Possession", label: "Possession" },
                { key: "Telepathy", label: "Telepathy" }
            ]
        ]
    },
    { 
        key: "Celerity", 
        label: "Celerity",
        powers: [
            [
                { key: "CatsGrace", label: "Cat's Grace" },
                { key: "RapidReflexes", label: "Rapid Reflexes" }
            ],
            [
                { key: "Fleetness", label: "Fleetness" }
            ],
            [
                { key: "Blink", label: "Blink" },
                { key: "Traversal", label: "Traversal" }
            ],
            [
                { key: "DraughtOfElegance", label: "Draught of Elegance" },
                { key: "UnerringAim", label: "Unerring Aim" }
            ],
            [
                { key: "LightningStrike", label: "Lightning Strike" },
                { key: "SplitSecond", label: "Split Second" }
            ]
        ]
    },
    { 
        key: "Dominate", 
        label: "Dominate",
        powers: [
            [
                { key: "CloudMemory", label: "Cloud Memory" },
                { key: "Compel", label: "Compel" }
            ],
            [
                { key: "Mesmerize", label: "Mesmerize" },
                { key: "Dementation", label: "Dementation" }
            ],
            [
                { key: "TheForgetfulMind", label: "The Forgetful Mind" },
                { key: "SubmergedDirective", label: "Submerged Directive" }
            ],
            [
                { key: "Rationalize", label: "Rationalize" }
            ],
            [
                { key: "MassManipulation", label: "Mass Manipulation" },
                { key: "TerminalDecree", label: "Terminal Decree" },
            ]
        ]
    },
    { 
        key: "Fortitude", 
        label: "Fortitude",
        powers: [
            [
                { key: "Resilience", label: "Resilience" },
                { key: "UnswayableMind", label: "Unswayable Mind" }
            ],
            [
                { key: "Toughness", label: "Toughness" },
                { key: "EnduringBeasts", label: "Enduring Beasts" }
            ],
            [
                { key: "DefyBane", label: "Defy Bane" },
                { key: "FortifyTheInnerFacade", label: "Fortify the Inner Facade" }
            ],
            [
                { key: "DraughOfEndurance", label: "Draugh of Endurance" }
            ],
            [
                { key: "FleshOfMarble", label: "Flesh of Marble" },
                { key: "ProwessFromPain", label: "Prowess from Pain" }
            ]
        ]
    },
    { 
        key: "Obfuscate", 
        label: "Obfuscate",
        powers: [
            [
                { key: "CloakOfShadow", label: "Cloak of Shadow" },
                { key: "SilenceOfDeath", label: "Silence of Death" }
            ],
            [
                { key: "UnseenPassage", label: "Unseen Passage" }
            ],
            [
                { key: "GhostInTheMachine", label: "Ghost in the Machine" },
                { key: "MakeOfAThousandFaces", label: "Make of a Thousand Faces" }
            ],
            [
                { key: "Conceal", label: "Conceal" },
                { key: "Vanish", label: "Vanish" }
            ],
            [
                { key: "CloakTheGathering", label: "Cloak the Gathering" },
                { key: "ImpostorsGuise", label: "Impostor's Guise" }
            ]
        ]
    },
    { 
        key: "Potence", 
        label: "Potence",
        powers: [
            [
                { key: "LethalBody", label: "Lethal Body" },
                { key: "SoaringLeap", label: "Soaring Leap" }
            ],
            [
                { key: "Prowess", label: "Prowess" }
            ],
            [
                { key: "BrutalFeed", label: "Brutal Feed" },
                { key: "SparkOfRage", label: "Spark of Rage" },
                { key: "UncannyGrip", label: "Uncanny Grip" }
            ],
            [
                { key: "DraughtOfMight", label: "Draught of Might" }
            ],
            [
                { key: "Earthshock", label: "Earthshock" },
                { key: "FistOfCaine", label: "Fist of Caine" }
            ]
        ]
    },
    { 
        key: "Presence", 
        label: "Presence",
        powers: [
            [
                { key: "Awe", label: "Awe" },
                { key: "Daunt", label: "Daunt" }
            ],
            [
                { key: "LingeringKiss", label: "Lingering Kiss" }
            ],
            [
                { key: "DreadGaze", label: "Dread Gaze" },
                { key: "Entrancement", label: "Entrancement" }
            ],
            [
                { key: "IrresistibleVoice", label: "Irresistible Voice" },
                { key: "Summon", label: "Summon" }
            ],
            [
                { key: "Majesty", label: "Majesty" },
                { key: "StarMagnetism", label: "Star Magnetism" }
            ]
        ]
    },
    { 
        key: "Protean", 
        label: "Protean",
        powers: [
            [
                { key: "EyesOfTheBeast", label: "Eyes of the Beast" },
                { key: "WeightOfTheFeather", label: "WeightOfTheFeather" }
            ],
            [
                { key: "FeralWeapons", label: "Feral Weapons" }
            ],
            [
                { key: "EarthMeld", label: "Earth Meld" },
                { key: "Shapechange", label: "Shapechange" },
            ],
            [
                { key: "Metamorphosis", label: "Metamorphosis" }
            ],
            [
                { key: "MistForm", label: "Mist Form" },
                { key: "TheUnfetteredHeart", label: "The Unfettered Heart" }
            ]
        ]
    },
    { 
        key: "BloodSorcery", 
        label: "Blood Sorcery",
        powers: [
            [
                { key: "CorrosiveVitae", label: "Corrosive Vitae" },
                { key: "ATesteForBlood", label: "A Teste for Blood" },
            ],
            [
                { key: "ExstinguishVitae", label: "Exstinguish Vitae" }
            ],
            [
                { key: "BloodOfPotency", label: "Blood of Potency" },
                { key: "ScorpionsTouch", label: "Scorpion's Touch" },
            ],
            [
                { key: "TheftOfVitae", label: "Theft of Vitae" }
            ],
            [
                { key: "BaalsCaress", label: "Baal's Caress" },
                { key: "CauldronOfBlood", label: "Cauldron of Blood" }
            ]
        ]
    },
    // { 
    //     key: "ThinBloodAlchemy", 
    //     label: "Thin-Blood Alchemy",
    //     powers: [
    //         [
    //             { key: "", label: "" },
    //             { key: "", label: "" },
    //         ],
    //         [
    //             { key: "", label: "" },
    //             { key: "", label: "" },
    //         ],
    //         [
    //             { key: "", label: "" },
    //             { key: "", label: "" },
    //         ],
    //         [
    //             { key: "", label: "" },
    //             { key: "", label: "" },
    //         ],
    //         [
    //             { key: "", label: "" },
    //             { key: "", label: "" },
    //         ]
    //     ]
    // }
];
export const backgrounds = [
    "Allies",
    "Contacts",
    "Fame",
    "Haven",
    "Herd",
    "Influence",
    "Loresheet",
    "Mask",
    "Mawla",
    "Resources",
    "Retainers",
    "Status"
];