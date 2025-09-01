export class ControlButtonService{

    /**
     * Génère le bouton de lancement du module et l'insère dans la barre de controle de Foundry
     * 
     * @returns {HTMLElement} Le bouton généré
     */
    static generateControlButton()
    {
        const button = document.createElement('button');

        // Les premières classes sont spécifiques à la V13 pour les identifier comme boutton de controle. Nécéssaire pour permettre le on click sur lélément
        button.classList.add("ui-control", "icon", "alien-roll-request-button", "fas", "fa-dice"); 
        button.type      = 'button';

        // Ajoute l'élément a la navbar de boutons de Foundry
        document.querySelector("#chat-controls .split-button").prepend(button);

        return button;
    }
}