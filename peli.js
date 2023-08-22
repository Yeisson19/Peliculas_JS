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
var  ub=pag;

$('#pagination').html(`


<nav aria-label="Page navigation example">
<ul class="pagination">
  <li class="page-item"><a class="page-link">Previous</a></li>
  <li class="page-item"><a class="page-link" onclick="pagination(this.id)" id="${ub}">${ub}</a></li>
  <li class="page-item"><a class="page-link" onclick="pagination(this.id)" id="${ub+1}">${ub+1}</a></li>
  <li class="page-item"><a class="page-link" onclick="pagination(this.id)" id="${ub+2}">${ub+2}</a></li> 
  <li class="page-item"><a class="page-link" onclick="pagination(this.id)" id="${ub+3}">${ub+3}</a></li> 
  <li class="page-item"><a class="page-link" onclick="pagination(this.id)" id="${ub+4}">${ub+4}</a></li> 
  <li class="page-item"><a class="page-link">Next</a></li>
</ul>
</nav>

`);

function pagination(n){
	console.log(n);
	pag = n;

	CargandoPeli();
}

pagination();

//-----------Botones---------//
// const btnAnterior = document.getElementById('btnAnterior');
// const btnSiguiente = document.getElementById('btnSiguiente');

// btnAnterior.addEventListener('click',()=>{
	
// 	if( pag > 1 ){
// 		pag -= 1;
// 		CargandoPeli();
// 	}
// });

// btnSiguiente.addEventListener('click',()=>ñ{

// 	if(pag < 1000){
// 		pag += 1;
// 		CargandoPeli();
// 	}
// });

// $('#demo').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7],
//     pageSize: 5,
//     showPrevious: false,
//     showNext: false,
//     callback: function(data, pagination) {
//         // template method of yourself
//         var html = template(data);
//         dataContainer.html(html);
//     }
// });
