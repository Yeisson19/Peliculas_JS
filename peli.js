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
			// console.log(datos.results);
			
			
			var vista="";
			datos.results.forEach(peli => {
				 vista += `
					<div class="pelicula" onclick="info(this.id)" id="${peli.id}">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
						<h3 class="titulo">${peli.title}</h3>
						<p class="">${peli.release_date}</p>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = vista;
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

//-----------------------------------------------

//-----Modal----------//
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
						<li>${des.genre_ids}</li>
						</ul>
					</div>
				`);
}
//--------------------------------------
  //pag -> paginas q mostrara
var pag=1;
     //ub -> ub de la pagina 
var  ub=0;
var final;

$(document).ready(nav);

function nav(){
	$('#pagination').html(`

	<nav aria-label="nav-movi">
	<ul class="pagination justify-content-center">
	  <li class="page-item"><a class="page-link" onclick="Anterior()" href="#">Previous</a></li>
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(1)}">${Number(ub)+Number(1)}</a></li>
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(2)}">${Number(ub)+Number(2)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(3)}">${Number(ub)+Number(3)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(4)}">${Number(ub)+Number(4)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(5)}">${Number(ub)+Number(5)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(6)}">${Number(ub)+Number(6)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(7)}">${Number(ub)+Number(7)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(8)}">${Number(ub)+Number(8)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(9)}">${Number(ub)+Number(9)}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${Number(ub)+Number(10)}">${Number(ub)+Number(10)}</a></li> 
	  <li class="page-item"><a class="page-link" onclick="Siguiente()" href="#">Next</a></li>
	</ul>
	</nav>
	
	`);
}


function pagination(n){
	console.log(n);
	// console.log(ub);
	pag = n;

	if (pag == 10 || pag == 20 || pag == 30 || pag == 40 || pag == 50 || pag == 60 || pag == 70 || pag == 80 || pag == 90) {
		//cambia los valores de paginacion
		ub=pag;
		//N° final de la paginacion
		final=Number(ub)+Number(10);
		console.log(ub);
		console.log(final);
		nav();
	}

	CargandoPeli();
}


//-----------Botones---------//
// const btnAnterior = document.getElementById('Anterior');
// const btnSiguiente = document.getElementById('Siguiente');

function Anterior(){
	
	if( pag > 1 ){
		pag -= 1;
		CargandoPeli();
	}
}

function Siguiente(){

	if(pag < 1000){
		pag += 1;
		CargandoPeli();
	}
}

