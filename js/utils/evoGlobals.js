
// evolutility :: global_var.js

// Using window as a global variables holder
// TODO: find better way

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

if(!window.evol){
	window.evol = {}
}
export default function(){
	return window.evol
}
