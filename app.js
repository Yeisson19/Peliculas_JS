//Cargando API -- Funcion Asincrona
const CargandoPeli = async () =>{
	//Tratando
	try{
		 		//Promesa
		const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e1d864e178ea9e978af97c6a0d6b2acb&language=es-ES&append_to_response=videos,images&page=${pag}`);
		console.log(api);

		if(api.status == 200){
			
			//opteniendo json
			const datos = await api.json();
			//imp datos
			console.log(datos.results);
			
			
			var vista="";
			datos.results.forEach(peli => {
				 vista += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
						<h3 class="titulo">${peli.title}</h3>
						<p class="blockquote-footer">${peli.overview}</p>
					</div>
				`;
			});

  
			const contenedor = document.getElementById('contenedor').innerHTML = vista;
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

var pag=1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnAnterior.addEventListener('click',()=>{
	
	if( pag > 1 ){
		pag -= 1;
		CargandoPeli();
	}
});

btnSiguiente.addEventListener('click',()=>{

	if(pag < 1000){
		pag += 1;
		CargandoPeli();
	}
});

//callfuntion
CargandoPeli();