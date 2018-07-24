//   Evolutility-UI-React Localized strings in FRENCH
//   (c) 2017 Olivier Giulieri
//   https://github.com/evoluteur/evolutility-ui-react

module.exports = {

	id: 'fr',    // FRENCH
    name: 'French',

    // --- toolbar & buttons for actions ---
    i18n_actions:{
        browse: 'Lecture',
        edit: 'Edition',
        // login: 'Login',
        new: 'Nouveau',
        newEntity: 'Nouvelle entrée', //'Nouvelle {0}',
        //newUpload: 'Nouveau fichier joint',
        //search: 'Recherche',
        //newSearch: 'New Search',
        //searchRes: 'Search Result',
        //selection: 'Selection',
        //selections: 'Selections',
        export1: 'Exporter',
        //import: 'Import',
        //massUpdate: 'Mass Update',
        delete1: 'Supprimer',
        //bAll: 'All',
        list: 'Liste',
        cards: 'Cartes',
        //bJSON: 'JSON',
        filter: 'Filtrer',
        //bScatter:'Scatter',
        charts: 'Graphs',
        //refresh: 'Refresh',
        //print: 'Print',
        save: 'Sauvegarder',
        //saveAdd: 'Save and Add Another',
        ok: 'OK',
        cancel: 'Annuler',

        // --- navigation/pagination ---
        prev: 'Précédent',
        next: 'Suivant',

        dropFile: 'Glisser-Déposer le fichier ici, or click pour selectionner le fichier.',
        remove_image: 'Supprimer l\'image actuelle',
        remove_document: 'Supprimer le document actuel'
    },

    // --- status ---
    i18n_msg:{
        nodata: 'Pas de {0} trouvé.', // 0=entities
        loading: 'Chargement en cours...',
        confirmLeave: 'Votre travail n\'est pas sauvegardé! Êtes-vous sûr de vouloir quitter?',
        range: '{0} à {1} parmis {2} {3}',// 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
        xinz: '{0} parmis {1} {2}',// 0=mSize, 1=totSize, 2=entities'
        //sgn_money: '$', // indicator for money
        //sgn_email: '@', // indicator for email
        added: 'Nouvel enregistrement ajouté "{1}".',
        updated: '{0} "{1}" édité.',
        deleted: '{0} "{1}" supprimé.'
        //error: 'Error',
    },

    // --- validation ---
    i18n_validation:{

        incomplete: 'Information incomplete.',
        invalid: 'Format Invalide.',
        //invalidList: '{0} valeurs parmis "{1}" sont invalides.',
        //invalidList1: 'Une valeur parmis "{1}" est invalide.',

        //intro:'Vous n\'avez pas encore terminé:',  
        empty:'Vous devez entrer une valeur pour le champs {0}.',
        email:'"{0}" doit avoir la forme "identifiant@domaine.com".',
        integer:'"{0}" doit étre un nombre entier.', 
        decimal:'"{0}" doit étre un nombre décimal.',
        money: '"{0}" doit étre un chiffre.',
        date:'"{0}" doit s\'écrire sous la forme Jour/Mois/Année, par exemple: 24/12/2017.',
        datetime:'"{0}" doit s\'écrire sous la forme Jour/Mois/Année heure:minutes am/pm, par exemple : 24/12/2017 10:30 am.', 
        time:'"{0}" doit s\'écrire sous la forme heure:minutes am/pm, par exemple : 10:30 am.',
        json: '"{0}" doit être une expression JSON comme "{"a": 1}".',
        max:'"{0}" doit être inférieur ou égal à {1}.',
        min:'"{0}" doit être supérieur ou égal à {1}.',
        maxLength: '"{0}" doit avoir au moins {1} caractères.',
        minLength: '"{0}" doit avoir moins de {1} caractères.',
        minMaxLength: '"{0}" doit avoir entre {1} et {2} caractères.',
        regExp:'"{0}" doit vérifier l\'expression régulière "{1}".',
    },

    // --- charts ---
    i18n_charts:{
        nocharts: 'Pas de Graph spécifié.'
    },

    i18n_errors: {
        badId: 'Données non disponibles pour id="{0}".',
        badEntity: 'Paramètre invalide: entity="{0}".',
        badChart: 'Données non disponibles.'
    }
};
