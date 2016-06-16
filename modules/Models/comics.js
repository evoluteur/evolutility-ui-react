module.exports = {
	fields:[
      {
          id: 'title', attribute: 'title', type: 'text', label: 'Title', required: true, 
          maxLength: 255,
          width: 100, inMany: true
      },
      {
          id: 'authors', attribute: 'authors', type: 'text', width: 62, inMany: true,
          label: 'Authors'
      },
      {
          id: 'genre', attribute: 'genre', type: 'lov', label: 'Genre', width: 38, inMany: true,
          list: [
              {id: 'adv', text: 'Adventure'},
              {id: 'conte', text: 'Fairy tale'},
              {id: 'eros', text: 'Erotic'},
              {id: 'fantasy', text: 'Fantastic'},
              {id: 'hf', text: 'Heroic Fantasy'},
              {id: 'hist', text: 'Historic'},
              {id: 'humor', text: 'Humor'},
              {id: 'nocat', text: 'One of a kind'},
              {id: 'youth', text: 'Youth'},
              {id: 'pol', text: 'Thriller'},
              {id: 'sf', text: 'Science-fiction'},
              {id: 'sh', text: 'Super Heros'},
              {id: 'wwest', text: 'Western'} 
          ]
      },
      {
          id: 'serie_nb', attribute: 'serie_nb', type: 'integer', width: 15, inMany: false,
          label: 'Albums', inCharts:false 
      },
      {
          id: 'have_nb', attribute: 'have_nb', type: 'integer', width: 15, inMany: false,
          label: 'Owned', inCharts:false 
      },
      {
          id: 'have', attribute: 'have', type: 'text', width: 32, inMany: false,
          label: 'Have' 
      },
      {
          id: 'complete', attribute: 'complete', type: 'boolean', width: 19, inMany: false,
          label: 'Complete', labelFalse:'Incomplete', labelTrue:'Complete'
      },
      {
          id: 'finished', attribute: 'finished', type: 'boolean', width: 19, inMany: false,
          label: 'Finished', labelTrue:'Finished', labelFalse:'Not finished', css:'cBlue'
      },

      {
          id: 'language', attribute: 'language', type: 'lov', label: 'Language', width: 30, inMany: true,
          list: [
              {id: 'FR', text: 'French', icon:'flag_fr.gif'},
              {id: 'EN', text: 'American', icon:'flag_us.gif'}
          ]
      },/*
      {
          id:'amazon', label:'Amazon', type:'formula', width:32, css:'evol-ellipsis',
          formula:function(m){
              if(m){
                  var urlData=m.get('title')+' '+(m.get('authors')||''),
                  link=m.get('language')=='FR' ?
                      'http://www.amazon.fr/s/ref=sr_nr_n_1?keywords='
                      :'http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=';
                  return '<a target="a" href="'+link+encodeURI(urlData)+'">'+_.escape(urlData)+'</a>';
              }
              return 'N/A';
          }
      },
      {
          id:'bdfugue', label:'BDFugue', type:'formula', width:38, css:'evol-ellipsis',
          formula:function(m){
              if(m){
                  var urlData=m.get('title')+' '+(m.get('authors')||''),
                  link='http://www.bdfugue.com/catalogsearch/result/?q=';
                  return '<a target="a" href="'+link+encodeURI(urlData)+'">'+_.escape(urlData)+'</a>';
              }
              return 'N/A';
          }
      },*/
      {
          id: 'notes', attribute: 'notes', type: 'textmultiline', label: 'Notes', maxLength: 1000,
          width: 100, height: 7, inMany: false
      },
      {
          id: 'pix', attribute: 'pix', type: 'image', width: 100, inMany: true,
          label: 'Album Cover', labelList:'Cover', labelBrowse:'', labelCards:''
      }
  ],

	data: [
    {
      "id": 1,
      "title": "Do Androids Dream Of Electric Sheep?",
      "authors": "Philip K Dick, Tony Parker",
      "genre": "sf",
      "serie_nb": 6,
      "have_nb": 6,
      "have": "1-6",
      "complete": true,
      "finished": true,
      "language": "EN",
      "notes": "",
      "pix": "androitsheep1.jpeg"
    },
    {
      "id": 2,
      "title": "Saga",
      "authors": "Brian K. Vaughan and Fiona Staples",
      "genre": "sf",
      "serie_nb": 4,
      "have_nb": 3,
      "have": "1-3",
      "complete": false,
      "finished": false,
      "language": "EN",
      "notes": "",
      "pix": "saga1.jpeg"
    },
    {
      "id": 3,
      "title": "Alim le Tanneur",
      "authors": "Wilfrid Lupano, Virginie Augustin",
      "genre": "hf",
      "serie_nb": 4,
      "have_nb": 4,
      "have": "1-4",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "alim1.jpg"
    },
    {
      "id": 4,
      "title": "La Caste des Meta-Barons",
      "authors": "Alexandro Jodorowsky et Juan Gimenez",
      "genre": "sf",
      "serie_nb": 8,
      "have_nb": 5,
      "have": "1-5",
      "complete": false,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "metabaron1.jpeg"
    },
    {
      "id": 5,
      "title": "Garulfo",
      "authors": "Alain Ayroles et Bruno Maïorana",
      "genre": "humor",
      "serie_nb": 6,
      "have_nb": 6,
      "have": "1-6",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "garulfo1.jpeg"
    },
    {
      "id": 6,
      "title": "Lanfeust de Troy",
      "authors": "Didier Tarquin, Christophe Arleston",
      "genre": "hf",
      "serie_nb": 8,
      "have_nb": 8,
      "have": "1-8",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "lanfeust1.jpeg"
    },
    {
      "id": 7,
      "title": "Salammbo",
      "authors": "Philippe Druillet et Gustave Flaubert",
      "genre": "fantasy",
      "serie_nb": 3,
      "have_nb": 3,
      "have": "1-3",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "salammbo1.jpeg"
    },
    {
      "id": 8,
      "title": "Blacksad",
      "authors": "Juan Díaz Canales et Juanjo Guarnido",
      "genre": "pol",
      "serie_nb": 4,
      "have_nb": 4,
      "have": "1-4",
      "complete": true,
      "finished": false,
      "language": "FR",
      "notes": "",
      "pix": "blacksad1.jpeg"
    },
    {
      "id": 9,
      "title": "Carmen McCallum",
      "authors": "Fred Duval et Gess",
      "genre": "sf",
      "serie_nb": 12,
      "have_nb": 5,
      "have": "1-5",
      "complete": false,
      "finished": false,
      "language": "FR",
      "notes": "",
      "pix": "carmenmc1.jpeg"
    },
    {
      "id": 10,
      "title": "Code McCallum",
      "authors": "Fred Duval et Didier Cassegrain",
      "genre": "sf",
      "serie_nb": 5,
      "have_nb": 5,
      "have": "5",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "codemc1.jpeg"
    },
    {
      "id": 11,
      "title": "La Nef des Fous",
      "authors": "Turf",
      "genre": "nocat",
      "serie_nb": 7,
      "have_nb": 7,
      "have": "1-7",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "neffous1.jpeg"
    },
    {
      "id": 12,
      "title": "La Quete de l'Oiseau du Temps",
      "authors": "Serge Le Tendre et Régis Loisel",
      "genre": "hf",
      "serie_nb": 4,
      "have_nb": 4,
      "have": "1-4",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "quete1.jpeg"
    },
    {
      "id": 13,
      "title": "Le Lama Blanc",
      "authors": "Alejandro Jodorowsky et Georges Bess",
      "genre": "adv",
      "serie_nb": 6,
      "have_nb": 6,
      "have": "1-6",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "lama1.jpeg"
    },
    {
      "id": 14,
      "title": "Le Surfer d'Argent",
      "authors": "Moebius, Stan Lee",
      "genre": "sh",
      "serie_nb": 1,
      "have_nb": 1,
      "have": "1",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "surfer.jpeg"
    },
    {
      "id": 15,
      "title": "L'Incal",
      "authors": "Moebius et Alexandro Jodorowsky",
      "genre": "sf",
      "serie_nb": 6,
      "have_nb": 6,
      "have": "1-6",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "incal1.jpeg"
    },
    {
      "id": 16,
      "title": "Ou le regard ne porte pas",
      "authors": "Pont et Abolin",
      "genre": "",
      "serie_nb": 2,
      "have_nb": 2,
      "have": "1,2",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "regard1.jpeg"
    },
    {
      "id": 17,
      "title": "Péma Ling",
      "authors": "Georges Bess",
      "genre": "hist",
      "serie_nb": 5,
      "have_nb": 5,
      "have": "1-5",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "pemaling1.jpeg"
    },
    {
      "id": 18,
      "title": "Sky Doll",
      "authors": "Alessandro Barbucci et Barbara Canepa",
      "genre": "fantasy",
      "serie_nb": 3,
      "have_nb": 3,
      "have": "1-3",
      "complete": true,
      "finished": true,
      "language": "FR",
      "notes": "",
      "pix": "skydoll1.jpeg"
    },
    {
      "id": 19,
      "title": "Ronin",
      "authors": "Franck Miller",
      "genre": "sf",
      "serie_nb": 1,
      "have_nb": 1,
      "have": "1",
      "complete": true,
      "finished": true,
      "language": "EN",
      "notes": "",
      "pix": "ronin.jpeg"
    },
    {
      "id": 20,
      "title": "Rising Stars",
      "authors": "Joe Michael Straczynski, Christian Zanier, Keu Cha et Ken Lashley",
      "genre": "sh",
      "serie_nb": 1,
      "have_nb": 1,
      "have": "1",
      "complete": true,
      "finished": true,
      "language": "EN",
      "notes": "",
      "pix": "risingstars.jpeg"
    }
  ]
}

