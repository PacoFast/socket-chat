const { io } = require('../server');
const {Usuarios} = require('../classes/Usuarios.js'); 
const {crearMensaje} = require('../utils/utilidades.js');  
let usuarios = new Usuarios();
io.on('connection', (client) => {
		//...
		client.on('entrarChat', (data, callback) =>{
				//Verifying the data from the url params
				if(!data.nombre || !data.nombre){
					return callback({
						err: true, 
						message: 'El nombre/sala son necesarios'
					});
				}

				//make sure that client do not enter in a default room
				client.join(data.sala); 	
				//Add a new person
				let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala); 	
				client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));
				//Sending the new person as response
				callback(usuarios.getPersonaPorSala(data.sala)); 
		});
		//Send a message to clients in a room
		client.on('crearMensaje', (data) =>{
			//Get a person with the client id
			let persona = usuarios.getPersona(client.id); 
			let mensaje = crearMensaje(persona.nombre, data.mensaje);
			client.broadcast.to(persona.sala).emit('crearMensaje', mensaje); 	
		});

		client.on('disconnect', () =>{
				//Delete the actual client who disconnect
				let personaBorrada = usuarios.borrarPersona(client.id); 
				if(!personaBorrada){
					console.log(personaBorrada); 
					return new Error(); 
				}
				//Emiting a message to the whole room
				client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje(personaBorrada.nombre, `${personaBorrada.nombre} salió`)); 
				//Showing a message to the other clients the actual list in the room
				client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));   

		}); 
	//Send a private message with the client's id
	client.on('mensajePrivado', (data) =>{
			let persona = usuarios.getPersona(client.id); 
			client.broadcast.to(data.para).emit('mensajePrivado', 
				crearMensaje(persona.nombre, data.mensaje)); 
	}); 
		
});
