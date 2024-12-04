let configuration = null;
const moduleId = 'alien-roll-request'

export function getModuleConfigration(){

    // retrive from cache data
    if(configuration){ return configuration;}
    const tempPath =  `/modules/${moduleId}/templates/`;

    configuration = {
        moduleId: moduleId,
        templatePath: tempPath
    };
    return configuration;
}

export function registerModuleSettings(){
    game.settings.register(moduleId, "hostile", {
        name: game.i18n.localize("DICEROLLREQUEST.SETTINGS.title"),
        hint: game.i18n.localize("DICEROLLREQUEST.SETTINGS.details"),
        scope: "world",
        config: true, 
        type: Boolean, 
        default: false, 
    });
}
