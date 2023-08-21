var datos;

//Cargando API -- Funcion Asincrona
const CargandoPeli = async () =>{
	//Tratando
	try{
		 		//Promesa
		const api = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e1d864e178ea9e978af97c6a0d6b2acb&language=es-ES&append_to_response=videos,images&page=${pag}`);
		// console.log(api);

		if(api.status == 200){
			
			//opteniendo json
			 datos = await api.json();
			//imp datos
			console.log(datos.results);
			
			
			var vista="";
			datos.results.forEach(peli => {
				 vista += `
					<div class="pelicula" onclick="info(this.id)" id="${peli.id}">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
						<h3 class="titulo">${peli.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = vista;

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

function info(i){
	console.log(i);
	var des;
	
   datos.results.forEach(e =>{
	if (e.id == i) {
		des= e;
		// console.log(des);
	}
  });
  $('#infoPeli').modal({ show:true });

				// HTML: Contruccion modal
				$('#infoPeli .modal-content .js-const').html(`
					<div class="modal-header">
						<h4 class="col-md-4">${des.title}</h4>					
						<div class="row">
    						<div class="col-lg">
       							 <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${des.backdrop_path}">
   		 					</div>
						</div>
					</div>
					
					<div class="modal-body">
					<ul>
						<li>${des.overview}</li>
						<p class="col-md-4">${des.release_date}</p>
						</ul>
					</div>
				`);
}

// var $myModal = $('#exampleModal);
// const modal2= document.getElementById('exampleModal');

// const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
// myModal.show();



//Botones
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