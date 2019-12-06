import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller);

let userLang = navigator.language || navigator.userLanguage;

if (userLang) {
    userLang = userLang.split("-")[0];
}

export default new MLCreate({
    initial: userLang || 'en',
    save: true, // process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('en').create({
            it: "Italian",
            en: "English",
            fr: "French",
            es: "Spanish",
            pt: "Portuguese",
            de: "German",
            storyTeller: "Story Teller",
            player: "Player",
            storyTellerLoginSubtitle: "Manage yuor chronicle an invite your players",
            playerLoginSubtitle: "Create your characters and join chronicles",
            loginButton: "Sing in with Google",
            publicStory: "Public Story",
            privateStory: "Privite Story",
            sessionsTimeline: "Sessions Timeline",
            joinChronicle: "Join the Chronicle",
            pendingInvitation: "Pending Invitation",
            invitationSent: "Invitation sent",
            invitationDeleted: "Invitation deleted",
            general: "General",
            refuges: "Refuges",
            refuge: "Refuge",
            updateAttachment: "Update attachment",
            createNewAttachment: "Create new attachment",
            createNewCharacter: "Create new character",
            createNewStory: "Create new story",
            createNewChronicle: "Create new chronicle",
            createNewPlace: "Create new place",
            updatePlace: "Update place",
            addDiscipline: "Add Discipline",
            disciplines: "Disciplines",
            saveSuccessfully: "Save successfully",
            fightStarted: "Fight started - auto-save enable",
            fightEnded: "Fight ended - auto-save disable",
            main: "Main",
            globalNote: "Global Note",
            experiencePoints: "Experience Points",
            playerNote: "Player Note",
            storyTellerNote: "Story-teller Note",
            dateFormat: "MMMM Do YYYY",
            createNewCoterie: "Create new Coterie / Pack",
            shortDescription: "Short description",
            noChronicle: "No Chronicle created",
            needCreation: "You have to create a Chronicle to start your story telling",

            // button label
            close: "Close",
            open: "Open",
            edit: "Edit",
            delete: "Delete",
            fight: "Fight",
            endFight: "End Fight",
            kill: "Kill",
            logout: "Logout",
            details: "Details",
            createStory: "Create Story",
            dismiss: "Dismiss",
            confirm: "Confirm",
            save: "Save",
            setOngoingStory: "Set as on going story",
            invitePlayer: "Invite player",
            createCoterie: "Create Coterie / Pack",
            fullScreen: "Full screen",
            send: "Send",
            complete: "Complete",
            undo: "Undo",
            createChronicle: "Create new Chronicle",
            resume: "Resume",
            add: "Add",
            start: "Start",
            startSession: "Start Session",
            sessionDetails: "Session Details",
            sessionOnGoing: "Session on going",
            endStory: "End Story",
            onGoing: "On Going",
            cancel: "Cancel",
            warning: "Warning",
            lastdeath: "Last Death",
            alive: "Alive",
            torpor: "Torpor",

            // input label
            selectImage: "Select image",
            playerVisibility: "Player Visibility",
            name: "Name",
            enterAnAddress: "Enter an address",
            address: "Address",
            noResultFound: "No result found",

            // icon tooltip
            dashboard: "Dashboard",
            stories: "Stories",
            players: "Players",
            coterie: "Coterie / Pack",
            attachments: "Attachments",
            places: "Places",
            session: "Session",
            characters: "Characters",

            // sheet label
            characteristics: "Characteristics",
            background: "Background",
            story: "Story",
            history: "History",
            generation: "Generation",
            clan: "Clan",
            sire: "Sire",
            lastUpdate: "Last Update",
            startingExperiencePoints: "Starting Experience Points",
            mainInformation: "Main Information",
            concept: "Concept",
            predator: "Predator",
            ambition: "Ambition",
            desire: "Desire",
            mortalLife: "Mortal Life",
            trueAge: "True age",
            apparentAge: "Apparent age",
            dateOfBirth: "Date of birth",
            dateOfDeath: "Date of death",
            academics: "Academics",
            animalKen: "Animal Ken",
            athletics: "Athletics",
            awareness: "Awareness",
            brawl: "Brawl",
            carisma: "Carism",
            composure: "Composure",
            craft: "Craft",
            dexterity: "Dexterity",
            drive: "Drive",
            etiquette: "Etiquette",
            finance: "Finance",
            firearms: "Firearms",
            insight: "Insight",
            intelligence: "Intelligence",
            intimidation: "Intimidation",
            investigation: "Investigation",
            larceny: "Larceny",
            leadership: "Leadership",
            manipulation: "Manipulation",
            medicine: "Medicine",
            melee: "Melee",
            occult: "Occult",
            performance: "Performance",
            persuasion: "Persuasion",
            politics: "Politics",
            resolve: "Resolve",
            science: "Science",
            stamina: "Stamina",
            stealth: "Stealth",
            streetwise: "Streetwise",
            strength: "Strength",
            subterfuge: "Subterfuge",
            survival: "Survival",
            technology: "Technology",
            wits: "Wits",
            health: "Health",
            willPower: "Will Power",
            humanity: "Humanity",
            bloodPotency: "Blood Potence",
            hunger: "Hunger",
            physical: "Physical",
            mental: "Mental",
            social: "Social",
            resonance: "Resonance",
            special: "special",

            // messages
            chronicleSuccessCreation: "Chronicle successfully created",
            sessionStarted: "Session started",
            areYouSure: "Are you sure?",
            chronicleDeleted: "Chronicle successfully deleted",
            charactersWillBeDeleted: "All the characters connected will be deleted",
            dataWillBeDeleted: "All the data connected will be deleted",
            confirmStartStory: "Do you really want to start this story?",
            confirmEndStory: "Do you really want to end this story?",
            confirmDelete: "Do you really want to delete {0}?",
            confirmInvitationDelete: "Do you really want to delete invitation sent to {0}?",
            confirmDeleteDiscipline: "Do you really want remove {0}?",
        }),

        new MLanguage('it').create({
            it: "Italiano",
            en: "Inglese",
            fr: "French",
            es: "Spagnolo",
            pt: "Portoghese",
            de: "Tedesco",
            storyTeller: "Narratore",
            player: "Giocatore",
            storyTellerLoginSubtitle: "Gestisci le tue cronache e invita i tuoi giocatori",
            playerLoginSubtitle: "Crea il tuo personaggio e partecipa alle cronache",
            loginButton: "Accedi con Google",
            publicStory: "Storia Pubblica",
            privateStory: "Storia Privata",
            sessionsTimeline: "Cronologia sessioni",
            joinChronicle: "Partecipa alla cronaca",
            pendingInvitation: "Inviti in attesa",
            invitationSent: "Invito inviato",
            invitationDeleted: "Invito eliminato",
            general: "Generali",
            refuges: "Rifugi",
            refuge: "Rifugio",
            updateAttachment: "Aggiorna allegato",
            createNewAttachment: "Crea nuovo allegato",
            createNewCharacter: "Crea nuovo personaggio",
            createNewStory: "Crea nuova storia",
            createNewChronicle: "Crea nuova cronaca",
            createNewPlace: "Crea nuovo luogo",
            updatePlace: "Aggiorna luogo",
            addDiscipline: "Aggiungi Disciplina",
            disciplines: "Discipline",
            saveSuccessfully: "Salvataggio avvenuto con successo",
            fightStarted: "Combattimento iniziato - auto-salvataggio abilitato",
            fightEnded: "Combattimento terminato - auto-salvataggio disabilitato",
            main: "Principale",
            globalNote: "Note Globali",
            experiencePoints: "Punti Esperienza",
            playerNote: "Note Giocatore",
            storyTellerNote: "Note Narratore",
            dateFormat: "Do MMMM YYYY",
            createNewCoterie: "Crea nuova Coterie / Pack",
            shortDescription: "Breve descrizione",
            noChronicle: "Nessuna cronaca creata",
            needCreation: "E' necessario creare una cronaca per iniziare la tua narrazione",

            // button label
            close: "Chiudi",
            open: "Apri",
            edit: "Modifica",
            delete: "Elimina",
            fight: "Combatti",
            endFight: "Termina",
            kill: "Uccidi",
            logout: "Esci",
            details: "Dettagli",
            createStory: "Crea Storia",
            dismiss: "Annulla",
            confirm: "Conferma",
            save: "Salva",
            setOngoingStory: "Imposta come storia attiva",
            invitePlayer: "Invita giocatore",
            createCoterie: "Crea Coterie / Pack",
            fullScreen: "Schermo intero",
            send: "Invia",
            complete: "Complete",
            undo: "Annulla",
            createChronicle: "Crea una nuova cronaca",
            resume: "Risorgi",
            add: "Aggiungi",
            start: "Inizia",
            startSession: "Inizia Session",
            sessionDetails: "Dettagli Sessione",
            sessionOnGoing: "Session attiva",
            endStory: "Termina storia",
            onGoing: "Attiva",
            cancel: "Cancella",
            warning: "Attenzione",
            lastdeath: "Morte ultima",
            alive: "Vivo",
            torpor: "Torpore",

            // input label
            selectImage: "Seleziona immagine",
            playerVisibility: "Visibilità giocatori",
            name: "Nome",
            enterAnAddress: "Inserisci un indirizzo",
            address: "Indirizzo",
            noResultFound: "Nessun risultato trovato",

            // icon tooltip
            dashboard: "Riepilogo",
            stories: "Storie",
            players: "Giocatori",
            coterie: "Coterie / Pack",
            attachments: "Allegati",
            places: "Luoghi",
            session: "Sessione",
            characters: "Personaggi",

            // sheet label
            characteristics: "Caratteristiche",
            background: "Passato",
            story: "Storia",
            history: "Cronologia",
            generation: "Generazione",
            clan: "Clan",
            sire: "Sire",
            lastUpdate: "Ultimo aggiornamento",
            startingExperiencePoints: "Punti Esperienza Iniziali",
            mainInformation: "Informazioni Principali",
            concept: "Concetto",
            predator: "Predatore",
            ambition: "Ambizione",
            desire: "Desiderio",
            mortalLife: "Vita Mortale",
            trueAge: "Età vera",
            apparentAge: "Età apparente",
            dateOfBirth: "Data di nasciata",
            dateOfDeath: "Data di morte",
            academics: "Accademiche",
            animalKen: "Addestrare animali",
            athletics: "Atletica",
            awareness: "Conoscienza",
            brawl: "Rissa",
            carisma: "Carisma",
            composure: "Aspetto",
            craft: "Manualità",
            dexterity: "Destrezza",
            drive: "Guidare",
            etiquette: "Galteo",
            finance: "Finanza",
            firearms: "Armi da fuoco",
            insight: "Empatia",
            intelligence: "Intelligenza",
            intimidation: "Intimidire",
            investigation: "Investigare",
            larceny: "Furtività",
            leadership: "Comando",
            manipulation: "Manipolazione",
            medicine: "Medicina",
            melee: "Mischia",
            occult: "Occulto",
            performance: "Espressione Artistica",
            persuasion: "Persuasione",
            politics: "Politica",
            resolve: "Prontezza",
            science: "Scienza",
            stamina: "Costituzione",
            stealth: "Muoversi silenziosamente",
            streetwise: "Conoscenza della strada",
            strength: "Forza",
            subterfuge: "Sotterfugio",
            survival: "Sopravvivenza",
            technology: "Tecnologia",
            wits: "Percezione",
            health: "Salute",
            willPower: "Forza di volontà",
            humanity: "Umanità",
            bloodPotency: "Potenza del sangue",
            hunger: "Fame",
            physical: "Fisiche",
            mental: "Mentali",
            social: "Sociali",
            resonance: "Risonanza",
            special: "speciale",

            // messages
            chronicleSuccessCreation: "Cronaca creata con successo",
            sessionStarted: "Session avviata",
            areYouSure: "Sei sicuro?",
            chronicleDeleted: "Cronaca eliminata con successo",
            charactersWillBeDeleted: "Tutti i personaggi collegati verranno eliminati",
            dataWillBeDeleted: "Tutte le informazioni collegate verranno eliminate",
            confirmStartStory: "Vuoi davvero avviare questa storia?",
            confirmEndStory: "Vuoi davvero terminare questa storia?",
            confirmDelete: "Vuoi davvero eliminare {0}?",
            confirmInvitationDelete: "Sei sicuro voler eliminare l'invito inviato a {0}?",
            confirmDeleteDiscipline: "Vuoi davvero eliminare {0}?",
        }),

        new MLanguage('fr').create({
            it: "Italian",
            en: "English",
            fr: "French",
            es: "Spanish",
            pt: "Portuguese",
            storyTeller: "Story Teller",
            player: "Player",
            storyTellerLoginSubtitle: "Manage yuor chronicle an invite your players",
            playerLoginSubtitle: "Create your characters and join chronicles",
            loginButton: "Sing in with Google",
            publicStory: "Public Story",
            privateStory: "Privite Story",
            sessionsTimeline: "Sessions Timeline",
            joinChronicle: "Join the Chronicle",
            pendingInvitation: "Pending Invitation",
            invitationSent: "Invitation sent",
            invitationDeleted: "Invitation deleted",
            general: "General",
            refuges: "Refuges",
            refuge: "Refuge",
            updateAttachment: "Update attachment",
            createNewAttachment: "Create new attachment",
            createNewCharacter: "Create new character",
            createNewStory: "Create new story",
            createNewChronicle: "Create new chronicle",
            createNewPlace: "Create new place",
            updatePlace: "Update place",
            addDiscipline: "Add Discipline",
            disciplines: "Disciplines",
            saveSuccessfully: "Save successfully",
            fightStarted: "Fight started - auto-save enable",
            fightEnded: "Fight ended - auto-save disable",
            main: "Main",
            globalNote: "Global Note",
            experiencePoints: "Experience Points",
            playerNote: "Player Note",
            storyTellerNote: "Story-teller Note",
            dateFormat: "MMMM Do YYYY",
            createNewCoterie: "Create new Coterie / Pack",
            shortDescription: "Short description",
            noChronicle: "No Chronicle created",
            needCreation: "You have to create a Chronicle to start your story telling",

            // button label
            close: "Close",
            open: "Open",
            edit: "Edit",
            delete: "Delete",
            fight: "Fight",
            endFight: "End Fight",
            kill: "Kill",
            logout: "Logout",
            details: "Details",
            createStory: "Create Story",
            dismiss: "Dismiss",
            confirm: "Confirm",
            save: "Save",
            setOngoingStory: "Set as on going story",
            invitePlayer: "Invite player",
            createCoterie: "Create Coterie / Pack",
            fullScreen: "Full screen",
            send: "Send",
            complete: "Complete",
            undo: "Undo",
            createChronicle: "Create new Chronicle",
            resume: "Resume",
            add: "Add",
            start: "Start",
            startSession: "Start Session",
            sessionDetails: "Session Details",
            sessionOnGoing: "Session on going",
            endStory: "End Story",
            onGoing: "On Going",
            cancel: "Cancel",
            warning: "Warning",
            lastdeath: "Last Death",
            alive: "Alive",
            torpor: "Torpor",

            // input label
            selectImage: "Select image",
            playerVisibility: "Player Visibility",
            name: "Name",
            enterAnAddress: "Enter an address",
            address: "Address",
            noResultFound: "No result found",

            // icon tooltip
            dashboard: "Dashboard",
            stories: "Stories",
            players: "Players",
            coterie: "Coterie / Pack",
            attachments: "Attachments",
            places: "Places",
            session: "Session",
            characters: "Characters",

            // sheet label
            characteristics: "Characteristics",
            background: "Background",
            story: "Story",
            history: "History",
            generation: "Generation",
            clan: "Clan",
            sire: "Sire",
            lastUpdate: "Last Update",
            startingExperiencePoints: "Starting Experience Points",
            mainInformation: "Main Information",
            concept: "Concept",
            predator: "Predator",
            ambition: "Ambition",
            desire: "Desire",
            mortalLife: "Mortal Life",
            trueAge: "True age",
            apparentAge: "Apparent age",
            dateOfBirth: "Date of birth",
            dateOfDeath: "Date of death",
            academics: "Academics",
            animalKen: "Animal Ken",
            athletics: "Athletics",
            awareness: "Awareness",
            brawl: "Brawl",
            carisma: "Carism",
            composure: "Composure",
            craft: "Craft",
            dexterity: "Dexterity",
            drive: "Drive",
            etiquette: "Etiquette",
            finance: "Finance",
            firearms: "Firearms",
            insight: "Insight",
            intelligence: "Intelligence",
            intimidation: "Intimidation",
            investigation: "Investigation",
            larceny: "Larceny",
            leadership: "Leadership",
            manipulation: "Manipulation",
            medicine: "Medicine",
            melee: "Melee",
            occult: "Occult",
            performance: "Performance",
            persuasion: "Persuasion",
            politics: "Politics",
            resolve: "Resolve",
            science: "Science",
            stamina: "Stamina",
            stealth: "Stealth",
            streetwise: "Streetwise",
            strength: "Strength",
            subterfuge: "Subterfuge",
            survival: "Survival",
            technology: "Technology",
            wits: "Wits",
            health: "Health",
            willPower: "Will Power",
            humanity: "Humanity",
            bloodPotency: "Blood Potence",
            hunger: "Hunger",
            physical: "Physical",
            mental: "Mental",
            social: "Social",
            resonance: "Resonance",
            special: "special",

            // messages
            chronicleSuccessCreation: "Chronicle successfully created",
            sessionStarted: "Session started",
            areYouSure: "Are you sure?",
            chronicleDeleted: "Chronicle successfully deleted",
            charactersWillBeDeleted: "All the characters connected will be deleted",
            dataWillBeDeleted: "All the data connected will be deleted",
            confirmStartStory: "Do you really want to start this story?",
            confirmEndStory: "Do you really want to end this story?",
            confirmDelete: "Do you really want to delete {0}?",
            confirmInvitationDelete: "Do you really want to delete invitation sent to {0}?",
            confirmDeleteDiscipline: "Do you really want remove {0}?",
        }),

        new MLanguage('es').create({
            it: "Italiano",
            en: "Inglés",
            fr: "Francés",
            es: "Español",
            pt: "Portugués",
            de: "Alemán",
            storyTeller: "Narrador",
            player: "Jugador",
            storyTellerLoginSubtitle: "Administra tu crónica e invita a tus jugadores",
            playerLoginSubtitle: "Crea tus personajes y únete a crónicas",
            loginButton: "Inicia sesión con Google",
            publicStory: "Historia pública",
            privateStory: "Historia privada",
            sessionsTimeline: "Cronología de sesiones",
            joinChronicle: "Únete a la crónica",
            pendingInvitation: "Invitación pendiente",
            invitationSent: "Invitación enviada",
            invitationDeleted: "Invitación eliminada",
            general: "General",
            refuges: "Refuges",
            refuge: "Refugios",
            updateAttachment: "Actualizar archivo adjunto",
            createNewAttachment: "Crear nuevo archivo adjunto",
            createNewCharacter: "Crear nuevo personaje",
            createNewStory: "Create new story",
            createNewChronicle: "Crea una nueva historia",
            createNewPlace: "Crear nuevo lugar",
            updatePlace: "Actualizar lugar",
            addDiscipline: "Añadir disciplina",
            disciplines: "Disciplinas",
            saveSuccessfully: "Ahorra exitosamente",
            fightStarted: "Lucha iniciada - habilitación de guardado automático",
            fightEnded: "Lucha finalizada - desactivación de guardado automático",
            main: "Principal",
            globalNote: "Nota global",
            experiencePoints: "Puntos de experiencia",
            playerNote: "Nota del jugador",
            storyTellerNote: "Nota del narrador",
            dateFormat: "Do MMMM YYYY",
            createNewCoterie: "Crear nuevo Coterie / Pack",
            shortDescription: "Breve descripción",
            noChronicle: "No se ha creado ninguna crónica.",
            needCreation: "Tienes que crear una crónica para comenzar a contar tu historia",

            // button label
            close: "Cerca",
            open: "Abierto",
            edit: "Editar",
            delete: "Borrar",
            fight: "Lucha",
            endFight: "Fin de la lucha",
            kill: "Matar",
            logout: "Cerrar sesión",
            details: "Detalles",
            createStory: "Crear historia",
            dismiss: "Despedir",
            confirm: "Confirmar",
            save: "Salvar",
            setOngoingStory: "Establecer como en la historia actual",
            invitePlayer: "Invitar jugador",
            createCoterie: "Crear Coterie / Pack",
            fullScreen: "Pantalla completa",
            send: "Enviar",
            complete: "Completar",
            undo: "Deshacer",
            createChronicle: "Crear nueva crónica",
            resume: "Currículum",
            add: "Añadir",
            start: "Iniciar",
            startSession: "Iniciar sesión",
            sessionDetails: "Detalles de la sesión",
            sessionOnGoing: "Sesión en marcha",
            endStory: "Historia final",
            onGoing: "En marcha",
            cancel: "Cancelar",
            warning: "Advertencia",
            lastdeath: "Ultima muerte",
            alive: "Vivo",
            torpor: "Entumecimiento",

            // input label
            selectImage: "Seleccionar imagen",
            playerVisibility: "Visibilidad del jugador",
            name: "Nombre",
            enterAnAddress: "Introduce una direccion",
            address: "Dirección",
            noResultFound: "No se han encontrado resultados",

            // icon tooltip
            dashboard: "Tablero",
            stories: "Cuentos",
            players: "Jugadores",
            coterie: "Coterie / Pack",
            attachments: "Archivos adjuntos",
            places: "Lugares",
            session: "Sesión",
            characters: "Caracteres",

            // sheet label
            characteristics: "Caracteristicas",
            background: "Experiencia personal",
            story: "Historia",
            history: "Cronología",
            generation: "Generacion",
            clan: "Clan",
            sire: "Padre",
            lastUpdate: "Última actualización",
            startingExperiencePoints: "Puntos de experiencia inicial",
            mainInformation: "Informacion principal",
            concept: "Concepto",
            predator: "Depredador",
            ambition: "Ambición",
            desire: "Deseo",
            mortalLife: "Vida mortal",
            trueAge: "Edad verdadera",
            apparentAge: "Edad aparente",
            dateOfBirth: "Fecha de nacimiento",
            dateOfDeath: "Fecha de muerte",
            academics: "Académico",
            animalKen: "Entrenar Animales",
            athletics: "Atletismo",
            awareness: "Conciencia",
            brawl: "Pelearse",
            carisma: "Carisma",
            composure: "Calma",
            craft: "Arte",
            dexterity: "Destreza",
            drive: "Manejar",
            etiquette: "Etiqueta",
            finance: "Financiar",
            firearms: "Armas de fuego",
            insight: "Visión",
            intelligence: "Inteligencia",
            intimidation: "Intimidación",
            investigation: "Investigación",
            larceny: "Hurto",
            leadership: "Liderazgo",
            manipulation: "Manipulación",
            medicine: "Medicina",
            melee: "Pelea confusa",
            occult: "Oculto",
            performance: "Actuación",
            persuasion: "Persuasión",
            politics: "Politics",
            resolve: "Política",
            science: "Science",
            stamina: "Aguante",
            stealth: "Stealth",
            streetwise: "Conocimiento del camino",
            strength: "Fuerza",
            subterfuge: "Subterfugio",
            survival: "Survival",
            technology: "Supervivencia",
            wits: "Ingenio",
            health: "Health",
            willPower: "Voluntad de poder",
            humanity: "Humanidad",
            bloodPotency: "Potencia de sangre",
            hunger: "Hambre",
            physical: "Físico",
            mental: "Mental",
            social: "Social",
            resonance: "Resonancia",
            special: "especial",

            // messages
            chronicleSuccessCreation: "Crónica creada con éxito",
            sessionStarted: "Sesión iniciada",
            areYouSure: "¿Estás seguro?",
            chronicleDeleted: "Crónica eliminada con éxito",
            charactersWillBeDeleted: "Todos los personajes conectados serán eliminados",
            dataWillBeDeleted: "Todos los datos conectados serán eliminados",
            confirmStartStory: "¿De verdad quieres comenzar esta historia?",
            confirmEndStory: "¿De verdad quieres terminar esta historia?",
            confirmDelete: "¿Realmente quieres eliminar {0}?",
            confirmInvitationDelete: "¿Realmente desea eliminar la invitación enviada a {0}?",
            confirmDeleteDiscipline: "¿Realmente quieres eliminar {0}?",
        }),

        new MLanguage('pt').create({
            it: "Italiano",
            en: "Inglês",
            fr: "Francês",
            es: "Espanhol",
            pt: "Português",
            de: "Alemão",
            storyTeller: "Narrador",
            player: "Jogador",
            storyTellerLoginSubtitle: "Gerencie sua crônica e convide seus jogadores",
            playerLoginSubtitle: "Crie seus personagens e participe de crônicas",
            loginButton: "Faça login no Google",
            publicStory: "História pública",
            privateStory: "História Privada",
            sessionsTimeline: "Cronograma das sessões",
            joinChronicle: "Junte-se à Crônica",
            pendingInvitation: "Convite pendente",
            invitationSent: "Convite enviado",
            invitationDeleted: "Convite excluído",
            general: "General",
            refuges: "Refúgios",
            refuge: "Refúgio",
            updateAttachment: "Atualizar anexo",
            createNewAttachment: "Criar novo anexo",
            createNewCharacter: "Criar novo personagem",
            createNewStory: "Criar nova história",
            createNewChronicle: "Create new chronicle",
            createNewPlace: "Criar novo local",
            updatePlace: "Atualizar local",
            addDiscipline: "Adicionar disciplina",
            disciplines: "Disciplinas",
            saveSuccessfully: "Salvo com sucesso",
            fightStarted: "Luta iniciada - ativação de salvamento automático",
            fightEnded: "A luta terminou - desativação do salvamento automático",
            main: "Principal",
            globalNote: "Nota Global",
            experiencePoints: "Pontos de experiência",
            playerNote: "Nota do Jogador",
            storyTellerNote: "Nota do narrador",
            dateFormat: "Do MMMM YYYY",
            createNewCoterie: "Crie um novo Coterie / Pack",
            shortDescription: "Pequena descrição",
            noChronicle: "Nenhuma Crônica criada",
            needCreation: "Você precisa criar uma Crônica para começar a contar sua história",

            // button label
            close: "Fechar",
            open: "Abrir",
            edit: "Editar",
            delete: "Excluir",
            fight: "Luta",
            endFight: "Luta Final",
            kill: "Mate",
            logout: "Sair",
            details: "Detalhes",
            createStory: "Criar história",
            dismiss: "Dispensar",
            confirm: "Confirme",
            save: "Salvar",
            setOngoingStory: "Definir como em andamento",
            invitePlayer: "Convidar jogador",
            createCoterie: "Crio Coterie / Pack",
            fullScreen: "Tela cheia",
            send: "Mandar",
            complete: "Completar",
            undo: "Desfazer",
            createChronicle: "Criar nova Crônica",
            resume: "Currículo",
            add: "Adicionar",
            start: "Começar",
            startSession: "Iniciar Sessão",
            sessionDetails: "Detalhes da sessão",
            sessionOnGoing: "Sessão em andamento",
            endStory: "História Final",
            onGoing: "Em progresso",
            cancel: "Cancelar",
            warning: "Atenção",
            lastdeath: "Ultima morte",
            alive: "Vivo",
            torpor: "Entorpecimento",

            // input label
            selectImage: "Selecione a imagem",
            playerVisibility: "Visibilidade do Jogador",
            name: "Nome",
            enterAnAddress: "Insira um endereço",
            address: "Endereço",
            noResultFound: "Nenhum resultado encontrado",

            // icon tooltip
            dashboard: "Painel de controle",
            stories: "Histórias",
            players: "Jogadoras",
            coterie: "Coterie / Pack",
            attachments: "Anexos",
            places: "Lugares",
            session: "Sessão",
            characters: "Personagens",

            // sheet label
            characteristics: "Característicos",
            background: "Conhecimento",
            story: "História",
            history: "Registro histórico",
            generation: "Geração",
            clan: "Clan",
            sire: "Pai",
            lastUpdate: "Última atualização",
            startingExperiencePoints: "Pontos de Experiência Iniciais",
            mainInformation: "Informação principal",
            concept: "Conceito",
            predator: "Predator",
            ambition: "Ambição",
            desire: "Desejo",
            mortalLife: "Vida Mortal",
            trueAge: "Idade verdadeira",
            apparentAge: "Idade aparente",
            dateOfBirth: "Data de nascimento",
            dateOfDeath: "Data da morte",
            academics: "Acadêmicos",
            animalKen: "Treinar animais",
            athletics: "Atletismo",
            awareness: "Consciência",
            brawl: "Brigar",
            carisma: "Carism",
            composure: "Compostura",
            craft: "Construir",
            dexterity: "Destreza",
            drive: "Dirigir",
            etiquette: "Etiqueta",
            finance: "Finança",
            firearms: "Armas de fogo",
            insight: "Discernimento",
            intelligence: "Inteligência",
            intimidation: "Intimidação",
            investigation: "Investigação",
            larceny: "Furto",
            leadership: "Liderança",
            manipulation: "Manipulação",
            medicine: "Remédio",
            melee: "Refrega",
            occult: "Oculto",
            performance: "Atuação",
            persuasion: "Persuasão",
            politics: "Político",
            resolve: "Resolver",
            science: "Ciência",
            stamina: "Energia",
            stealth: "Furtividade",
            streetwise: "Conhecimento da estrada",
            strength: "Força",
            subterfuge: "Subterfúgio",
            survival: "Sobrevivência",
            technology: "Tecnologia",
            wits: "Perspicácia",
            health: "Saúde",
            willPower: "Força de vontade",
            humanity: "Humanidade",
            bloodPotency: "Potência do sangue",
            hunger: "Fome",
            physical: "Fisica",
            mental: "Mental",
            social: "Social",
            resonance: "Ressonância",
            special: "especial",

            // messages
            chronicleSuccessCreation: "Crônica criada com sucesso",
            sessionStarted: "Sessão iniciada",
            areYouSure: "Você tem certeza?",
            chronicleDeleted: "Crônica excluída com sucesso",
            charactersWillBeDeleted: "Todos os caracteres conectados serão excluídos",
            dataWillBeDeleted: "Todos os dados conectados serão excluídos",
            confirmStartStory: "Você realmente quer começar esta história?",
            confirmEndStory: "Deseja mesmo terminar esta história?",
            confirmDelete: "Deseja realmente excluir {0}?",
            confirmInvitationDelete: "Deseja realmente excluir o convite enviado para {0}?",
            confirmDeleteDiscipline: "Deseja mesmo remover {0}?",
        }),
    ]
})