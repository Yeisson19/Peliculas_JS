const CargarTv = async ()=>{
	try{
		const tv_api= await fetch("https://api.themoviedb.org/3/tv/popular?api_key=e1d864e178ea9e978af97c6a0d6b2acb&language=es-ES");
	console.log(tv_api);
	}
	catch(error){
		console.log(error);
	}
}