
import format from '../../utils/format'

export default {
    id: 'winetasting',
    title: 'Wine tasting',
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
            id: 'drink_date', type: 'date', 
            label: 'Date', inMany: true,
            width: 38,
            required: true
        },
        { 
            id: 'wine_id', object: 'winecellar', type: 'lov', 
            label: 'Wine', inMany: true,
            width: 62,
            required: true
        },
        { 
            id: 'taste', type: 'text', 
            label: 'Taste', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'robe', type: 'text', 
            label: 'Robe', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'nose', type: 'text', 
            label: 'Nose', maxLength: 100, inMany: true,
            width: 100,
        },
        { 
            id: 'notes', type: 'textmultiline', 
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
