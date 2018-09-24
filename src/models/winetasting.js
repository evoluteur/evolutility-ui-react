
import format from '../utils/format'

export default {
    id: 'winetasting',
    table: 'wine_tasting',
    title: 'Wine Tasting',
    titleField: function(data){
        var title = ''
        if(data.wine_id){
            title += data.wine_id_txt+' ';
        }
        if(data.ddate){
            if(data.wine_id){
                title += 'on ';
            }
            title += format.dateString(data.ddate);
        }
        return title || 'N/A';
    },
    name: 'wine tasting',
    namePlural: 'wine tastings',
    label: 'Wine Tasting',
    icon: 'wine.gif',
    //fnSearch: ['name', 'winery', 'appellation', 'notes'],
    fields: [
        { 
            id: 'drink_date', column: 'drink_date', type: 'date', 
            label: 'Date', inMany: true,
            width: 38,
            required: true
        },
        { 
            id: 'wine_id', entity: 'winecellar', column: 'wine_id', type: 'lov', 
            label: 'Wine', inMany: true,
            width: 62,
            required: true
        },
        { 
            id: 'taste', column: 'taste', type: 'text', 
            label: 'Taste', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'robe', column: 'robe', type: 'text', 
            label: 'Robe', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'nose', column: 'nose', type: 'text', 
            label: 'Nose', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'notes', column: 'notes', type: 'textmultiline', 
            label: 'Notes', inMany: true, height: 5,
            width: 100,
        }
    ],

    groups: [
        {
          id:"p1", type:"panel", 
          label: "Degustation", width: 62,
          fields: ['drink_date', 'wine_id', 'notes']
        },
        {
          id:"p2", type:"panel", 
          label: "Evaluation", width: 38,
          fields: ['taste', 'robe', 'nose']
        }, 
    ]
};
