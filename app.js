const CargandoPeli = async () =>{

	try{
		const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e1d864e178ea9e978af97c6a0d6b2acb&language=es-ES`);
		console.log(api);
		//estado coneccion
		if(api.status == 200){

		}
		else{
			console.log("Hay un error de coneccion");
		}
	}
	catch{

	}
	 

}

CargandoPeli();