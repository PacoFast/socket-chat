class Usuarios{

	constructor(){
		this.personas = []; 
	}

	agregarPersona(id, nombre, sala){
		//Creating an person object type
		let persona = {id, nombre, sala}; 
		//pushing the object to the array
		this.personas.push(persona); 
		return this.personas; 
	}

	getPersona(id){
		//Using filter to get an array with conditions below
		let persona = this.personas.filter( persona =>  persona.id === id )[0]; 
		//Si no encuentra ninguna persona sera undefined
		return persona; 
	}

	getPersonas(){
		return this.personas; 
	}
	
	getPersonaPorSala(sala){
		let personaEnSala = this.personas.filter( persona => persona.sala === sala); 
		return personaEnSala; 
	}

	borrarPersona(id){
		let personaBorrada = this.getPersona(id); 
		//Asignamos a nuestro arreglo personas todas las personas que tengan el id diferente al que queremos borrar
		this.personas = this.personas.filter( persona => persona.id !== id);	

		return personaBorrada; 
	}


}


module.exports = {
	Usuarios
}
