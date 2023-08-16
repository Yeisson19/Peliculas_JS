//Cargando API -- Funcion Asincrona
const CargandoPeli = async () =>{
	//Tratando
	try{
		 		//Promesa
		const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e1d864e178ea9e978af97c6a0d6b2acb&language=es-ES`);
		console.log(api);

		if(api.status == 200){
			console.log("exitosa coneccion");
		}
		else{
			console.log("Hay un error de coneccion");
		}
	}
	//Atrapar
	catch(error){
			console.log(error);
	}
	 

}

//callfuntion
CargandoPeli();