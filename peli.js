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
			//numero a identificar
			
			var vista="";
			datos.results.forEach(peli => {
				var fecha=peli.release_date;
				var fecha2= formato(fecha);

				 vista += `
					<div class="pelicula" id="${peli.id}">
						<img class="poster" id="${peli.id}" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
						<h3 class="titulo">${peli.title}</h3>
						<p class="text-muted">${fecha2}</p>
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

	
	$('#pagina').html(`<a>${pag}</a>`);
}

//----Fecha---
function formato(fecha){
	return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

//---
//-----------------------------------------------
//calling the funtion
CargandoPeli();
//callnav
$(document).ready(nav);
//-----------------------------------------------


//-----Modal----------//
function info(i){
	// console.log(i);
	let des;
	
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
						</ul>
					</div>
				`);
}
//--------------------------------------
  //pag -> paginas q mostrara
var pag=1;//5
var escrol = false;
var onevalue=0;
var n=0;


function nav(){
//ub -> ub de la pagina 
  let ub=[];
  ub.length = 0;

   for(let i=0;i<10;i++){
	
	if(pag==1 && i==0){
		ub[i]=pag;//1
	}
    if(pag == 1 && i != 0){
	ub[i]=Number(pag)+Number(i);//2,3,4...
	}
	if(pag !=1 && escrol == false){
	ub[i]=Number(pag)+Number(i+1);//11,12...
	}
	if(escrol == true){
		ub[i]= Number(n) + Number(i+1);

	}
	
	if(escrol==false){onevalue= Number(ub[0])- Number(1);}
	// console.log("ub=" + ub[i]);
   }
	$('#pagination').html(`

	<nav aria-label="nav-movi">
	<ul class="pagination justify-content-center">

	<li class="page-item">
	<a class="page-link" href="#" aria-label="Previous"  onclick="BackPag()">
	  <span aria-hidden="true">&laquo;</span>
	  <span class="sr-only"></span>
	</a>
    </li>

	  <li class="page-item"><a class="page-link" href="#" id="Anterior">Anterior</a></li>
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[0]}">${ub[0]}</a></li>
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[1]}">${ub[1]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[2]}">${ub[2]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[3]}">${ub[3]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[4]}">${ub[4]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[5]}">${ub[5]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[6]}">${ub[6]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[7]}">${ub[7]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" onclick="pagination(this.id)" id="${ub[8]}">${ub[8]}</a></li> 
	  <li class="page-item"><a class="page-link ultima" href="#" id="${ub[9]}">${ub[9]}</a></li> 
	  <li class="page-item"><a class="page-link" href="#" id="Siguiente">Siguiente</a></li>
	

	</ul>
	</nav>`);

	//-----------Botones---------//
const btnAnterior= document.getElementById('Anterior');
btnAnterior.addEventListener('click',()=>{
	// console.log("antrerior");
	if( pag > 1 ){
		pag -= 1;
		CargandoPeli();
	}
});
const btnSiguiente= document.getElementById('Siguiente');
btnSiguiente.addEventListener('click',()=>{

	if(pag < 1000){
		pag += 1;
		CargandoPeli();
	}
});
	// console.log("valor q deve iniciar: " + n);
	// console.log("Primer valor: " + onevalue);
    if(escrol==true){onevalue= n;}
	escrol=false;
}


// document.body
// function off(){

// if(ub=1){

// 	const id_Anterior = document.getElementById('Anterior');
// 	console.log(id_Anterior);
// 	const nuevaCaja = document.createElement(id_Anterior);
// 	console.log(nuevaCaja);

// 	}
// }


function pagination(n){

	pag = n;
	// console.log(n);
	// console.log(ub);
	const ultima= document.querySelector('.ultima');
	ultima.addEventListener('click',()=>{
		for (let y = 0; y < 100; y+=10) {
			if(pag == y){
				nav();
			}
			
		}

	});
	

	CargandoPeli();
}



function BackPag(){
	if(onevalue>=10){
	escrol = true;
	n=Number(onevalue) - Number(10);
	nav();
	}
}

var movi_id= document.getElementById('contenedor').addEventListener('click',(e)=>{

// 	if (e.target.matches('div.pelicula') || e.target.matches('h3.titulo') || e.target.matches('p.text-muted')) {
// 		// Ejecuta solo si el elemento que fue clickeado tiene la clase caja.
// 		console.log(`Hiciste click en la caja ${e.target.innerText}`);
// 		let idDelElemento = e.target.id;
// console.log(idDelElemento);
// info(idDelElemento);
// 	}

if(e.target && e.target.tagName == 'IMG'){
	let idDelElemento = e.target.id;
console.log(idDelElemento);
info(idDelElemento);
}

// 	if (e.target.classList.contains("pelicula")) {
// 		// Ejecuta solo si el elemento que fue clickeado tiene la clase caja.
// 		// console.log(`Hiciste click en la caja ${e.target.innerText}`);
// 		let idDelElemento = e.target.id;
// console.log(idDelElemento);
// info(idDelElemento);
// 	}



// if(e.target && e.target.tagName == 'DIV'){
// 	// e.target.classList.toggle('activo');
// 	console.log("click en div");
// 	console.log(e);
// }
});

// let contenido= document.querySelectorAll('.titulo ');
// console.log(contenido);

// contenido.addEventListener