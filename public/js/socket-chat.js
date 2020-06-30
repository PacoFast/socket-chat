var socket = io();
//GET the params for the url
var params = new URLSearchParams(window.location.search); 

if(!params.has('nombre') || !params.has('sala')){
	window.location = 'index.html'; 	
	new ThrowError('El nombre y sala son necesarios'); 
}
//Creating an user object type
var usuario = {
	nombre: params.get('nombre'),
	sala: params.get('sala') 
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
		//making a emit with a callback to get a response
		socket.emit('entrarChat', usuario, function(resp){
			console.log('---------------\n', resp); 
		});
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
	console.log(mensaje); 
});
//listening an event of connection or disconnection
socket.on('listaPersona', function(resp){
	console.log(resp); 
});

socket.on('mensajePrivado', function(resp){
	console.log('Mensaje privado: ',resp); 
}); 
