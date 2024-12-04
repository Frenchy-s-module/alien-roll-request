import { ChatMessageService } from "./services/ChatMessageService.js";
import { Modale } from "./ressources/Modale.js";
import { getModuleConfigration, registerModuleSettings } from './config.js';
import { getTranslationFromAction }  from './services/AlienService.js';

let config = {};

Hooks.once("ready", async () => {

    // Charge une première fois les données de configuration pour que les autres modules utilisent le cache du singleton
    config = getModuleConfigration();

    // Configuration d'une fonction de localisation cusom pour les skills et Attributs d'Alien
    // La variable toUpper force une maj pour les attributs qui ne respectent pas la même convention de nommage que les skills ....
    Handlebars.registerHelper( 'localizeByKey', function(name) {
        return getTranslationFromAction(name);
    });

    // Initialise la fenêtre modale et les listeners pour les GM
    if(game.user.isGM){
        const modale = new Modale(document.querySelector("#chat-controls .chat-control-icon"));
        ChatMessageService.cleanChatMessageByClassName('alien-request-roll');
        ChatMessageService.setMessageCreationListener(modale);

        Hooks.on('createToken', (token) => {
            modale.update();
        });
        
        Hooks.on('deleteToken', (token) => {
            modale.update();
        });
    }

    ChatMessageService.setCommonListeners();
});


Hooks.once("init", () => {
    registerModuleSettings();
});