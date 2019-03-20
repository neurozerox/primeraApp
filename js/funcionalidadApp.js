var provider = new firebase.auth.GoogleAuthProvider();

//Acciòn click botón acceso
$('#logueo').click(function(){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(result){
		console.log(result.user);
		almacenaDatos(result.user);
		$('#logueo').hide();
		$('#principal').append("<img width='200px' src='"+result.user.photoURL+"'/>");
		$('#nombre').append(result.user.displayName);
	});
});

//guardado de datos automatico
function almacenaDatos(user){
	var datosDelUsuario={
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL,
		uid:user.uid
		}
	//firebase.database().ref("datosInicioDeSesion/"+user.uid)
	firebase.database().ref("datosInicioDeSesion/usuarios")
	.push(datosDelUsuario);
}


//leyendo la base de datos en tiempo real
function muestraUsuarios(){
	firebase.database().ref("datosInicioDeSesion/usuarios")
	.on("child_added",function(s){
		var usuario2=s.val();
		$('#principal').append("<img class='img_principal' width='150px' src='"+usuario2.foto+"'/>");
	});
}

muestraUsuarios();
	
	
	