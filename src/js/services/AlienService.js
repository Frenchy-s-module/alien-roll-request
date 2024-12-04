/**
 * Interaction et récupération d'éléments du systeme Alien RPG
 */
const path = '/systems/alienrpg/template.json'

let playableAction = null;

export async function getAlienConfigration(){

    // retrive from cache data
    if(playableAction){ return playableAction;}

    const moduleInfos = await getAlienTemplateDatas();

    playableAction = {
        attributes: moduleInfos.Actor.character.attributes,
        skills: moduleInfos.Actor.character.skills,
    };

    return playableAction;
}

async function getAlienTemplateDatas(){
    const moduleJsonPath = new URL(path, import.meta.url).href; // Adjust path if necessary
    const response = await fetch(moduleJsonPath);
    if (!response.ok) throw new Error(`Failed to load alien template.json: ${response.statusText}`);
  
    return await response.json();
}

export async function getActionKeyFromLabel(label){
    const datas = await getAlienTemplateDatas();
    const attributes = datas.Actor?.character?.attributes;
    const skills = datas.Actor?.character?.skills;
    if (!attributes) {
        return null;
    }
    for (const key in attributes) {
        if (attributes[key]?.label === label) {
            return key;
        }
    }
    for (const key in skills) {
        if (attributes[key]?.label === label) {
            return key;
        }
    }
    return null;
}

export function getTranslationFromAction(label){
    const upcased =  label.charAt(0).toUpperCase() + label.slice(1);
    return localizeIfExists(`ALIENRPG.Skill${label}`) ?? localizeIfExists(`ALIENRPG.Ability${upcased}`);
}

function localizeIfExists(label){
    if(game.i18n.localize(label) !== label){
        return game.i18n.localize(label)
    }
    return null;
}