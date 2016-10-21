//   React-Evolutility Localization Library ENGLISH
//   (c) 2016 Olivier Giulieri

module.exports = {

	LOCALE: 'EN',    // ENGLISH
    locale: 'English',

    // --- toolbar & buttons for actions ---
    i18n_actions:{
        browse: 'Browse',
        edit: 'Edit',
        //mini: 'Mini', // 'Quick Edit'
        // login: 'Login',
        new: 'New',
        newEntity: 'New {0}', //'New Item',
        //newUpload: 'New Upload',
        //search: 'Search',
        //newSearch: 'New Search',
        //searchRes: 'Search Result',
        //selection: 'Selection',
        //selections: 'Selections',
        export1: 'Export',
        //import: 'Import',
        //massUpdate: 'Mass Update',
        delete1: 'Delete',
        //bAll: 'All',
        list: 'List',
        cards: 'Cards',
        //bJSON: 'JSON',
        filter: 'Filter',
        //bBubbles: 'Bubbles',
        //bSunburst: 'Sunburst',
        //bScatter:'Scatter',
        charts: 'Charts',
        //refresh: 'Refresh',
        //print: 'Print',
        save: 'Save',
        //saveAdd: 'Save and Add Another',
        //ok: 'OK',
        cancel: 'Cancel',

        // --- wizard ---
        prev: 'Previous',
        next: 'Next',
        //finish: 'Finish !'
    },
/*
    // --- msg & status ---
    //msg: {
    saved: '{0} saved.',
    unSavedTitle: 'Changes pending',
    unSavedChanges: 'Do you want to save the changes you made to "{0}"?',
    warnNoSave: 'Your changes will be lost if you don\'t save them.',
    bNoSave: 'Don\'t Save',
    deleteX: 'Delete {0}',// {0}=entity
    delete1: 'Do you really want to delete the {0} "{1}"?', // {0}=entity {1}=titlefield value,
    deleteN: 'Delete {0} {1}?', // delete 5 tasks
    deleted1: '{0} deleted.', // {0}=entity ,

    notFound: 'Item not found.',
    //this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.name);
    notFoundMsg: 'No {0} found.',
    notFoundMsgId: 'No {0} found for ID="{1}".',

    //NoChange: 'No Change',
    //NoX: 'No {0}',
    //Back2SearchResults: 'Back to search results',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    na: 'N/A', // 'not available'
    nodata: 'No data available.',
    notEnoughdata: 'Not enough data available.',
    nopix: 'No picture.',
    nochart: 'No charts available.',
    badchart: 'Not enough information provided to draw charts.',
    selected: '{0} selected',
    //},
*/    
    // --- status ---
    i18n_msg:{
        confirmLeave: 'Your work is not saved! Are you sure you want to leave?',
        range: '{0} to {1} of {2} {3}',// 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
        //sgn_money: '$', // indicator for money
        //sgn_email: '@', // indicator for email
        added: 'New {0} "{1}" added.',
        updated: '{0} "{1}" updated.',
        deleted: '{0} "{1}" deleted.'
        //error: 'Error',
    },

    // --- validation ---
    i18n_validation:{
        incomplete: 'Some information is missing or invalid.',
        invalid: 'Invalid format.',
        invalidList: '{0} values in "{1}" are invalid.',
        invalidList1: '1 value in "{1}" is invalid.',
        //intro: 'You are not finished yet: ',
        empty: '"{0}" must have a value.',
        email: '"{0}" must be a valid email formatted like "name@domain.com".',
        integer: '"{0}" must only use numbers.',
        decimal: '"{0}" must be a valid decimal numbers.',
        money: '"{0}" must be a valid number.',
        date: '"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2016".',
        datetime: '"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2016 10:30 AM".',
        time: '"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
        json: '"{0}" must be a valid JSON expression like "{"a": 1}".',
        max: '"{0}" must be smaller or equal to {1}.',
        min: '"{0}" must be greater or equal to {1}.',
        maxLength: '"{0}" must be {1} characters long maximum.',
        minLength: '"{0}" must be at least {1} characters long.',
        minMaxLength: '"{0}" must be between {1} and {2} characters long.',
        regExp: '"{0}" is not of the expected format.'
        //regExp: '"{0}" must match the regular expression pattern for "{1}".'
    },

    // --- charts ---
    charts:{
        aByB: '{0} by {1}',
        aB: '{0}: {1}'
    },

        // --- data visualization ---
        //vizGroupBy: 'Group by',
        //vizColorBy: 'Color by',
        //vizSizeBy: 'Size by',

        //xAxis: 'X Axis',
        //yAxis: 'Y Axis',
        //zAxis: 'Z Axis',
/*
    // --- export ---
    export:{
        exportOne: 'Export {0}', // {0}=entity
        exportMany: 'Export {0}', // {0}=entities
        preview: 'Export preview',
        header: 'Header',
        options: 'options',
        separator: 'Separator',
        firstLine: 'The first row is a header',
        format: 'Export format',
        xpFields: 'Fields to include in the export',
        IDkey: 'ID',
        allFields: 'Show all fields',
        formatCSV: 'Comma separated values (CSV, TXT, XLS...)',
        formatHTML: 'HTML',
        formatSQL: 'SQL Insert Statements (SQL)',
        formatTAB: 'Tab separated values (TXT)',
        formatXML: 'XML',
        formatJSON: 'Javascript Object Notation (JSON)',
        //xpColors: 'Header color-Color odd rows-Color even rows',
        //xpColMap: 'Columns map to',
        XMLroot: 'Element name', // 'Root element name'
        //xpXMLAttr: 'Attributes',
        //xpXMLElem: 'Elements',
        headerLabels: 'Field Labels',
        headerIds: 'Field Attributes or Ids',
        db: 'Database',
        SQL: 'SQL Options',
        SQLTable: 'Table name',
        SQLTrans: 'In transaction',
        SQLIdInsert: 'Identity insert',
        DownloadEntity: 'Download {0}'
    },

    // --- import ---
    import:{
        importOne: 'Import {0}', // {0}=entity
        importMany: 'Import {0}', // {0}=entities
        format: 'Source Format',
        sample: 'Sample',
        allowDups: 'Allow duplicates',
        data: 'Data to Import',
        success: 'Import done.',
        empty: 'Nothing to Import.'
    },

    // --- filters ---
    i18n_filters:{
        sEqual: 'equals',
        sNotEqual: 'not equal',
        sStart: 'starts with',
        sContain: 'contains',
        sNotContain: 'doesn\'t contain',
        sFinish: 'finishes with',
        sInList: 'is any of',
        sIsNull: 'is empty',
        sIsNotNull: 'is not empty',
        sBefore: 'before',
        sAfter: 'after',
        sNumEqual: '=',
        sNumNotEqual: '!=',
        sGreater: '>',
        sSmaller: '<',
        sOn: 'on',
        sNotOn: 'not on',
        sAt: 'at',
        sNotAt: 'not at',
        sBetween: 'between',

        opAnd: 'and',
        //opOr: 'or',

        yes: 'Yes',
        no: 'No',
        bNewCond: 'New filter condition',
        bAddCond: 'Add condition',
        bUpdateFilter: 'Update filter',
        bSubmit: 'Submit',
        bCancel: 'Cancel'
    },

    // --- documentation ---
    doc:{
        entity: 'Entity',
        fields: 'Fields',
        uiModel: 'UI Model',
        dbModel: 'DB Model'
    },*/

    i18n_errors: {
        badId: 'Couldn\'t retrieve data for id="{0}".',
        badEntity: 'Invalid parameter: entity=\"{0}\".',
        badChart: 'Couldn\'t retrieve charts data.'
    }
};
