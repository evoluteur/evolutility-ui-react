//   Evolutility-UI-React Localization Library
//   (c) 2016 Olivier Giulieri
//   https://github.com/evoluteur/evolutility-ui-react

import en from './i18n-en'
import fr from './i18n-fr'

import {locale} from '../../config'

const i18nObj = {},
	languages = {
	    en: en,
	    fr: fr
	}

function setLocale(loc){
	const i18nStrings = languages[loc]

	if(i18nStrings){
		for (var n in i18nStrings){
			if(i18nStrings.hasOwnProperty(n)){
				i18nObj[n] = i18nStrings[n]
			}
		}
	}
}

setLocale(locale||'en')

i18nObj.setLocale = setLocale

module.exports = i18nObj
