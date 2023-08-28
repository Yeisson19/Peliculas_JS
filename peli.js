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

//-----------------------------------------------
//calling the funtion
CargandoPeli();
//Mostrar paginacion
$(document).ready(MostrarPag);
//callnav
$(document).ready(nav);
//-----------------------------------------------

//----Opteniendo ID Peli---
var movi_id= document.getElementById('contenedor').addEventListener('click',(e)=>{

	if(e.target && e.target.tagName == 'IMG'){
		let idDelElemento = e.target.id;
	console.log(idDelElemento);
	info(idDelElemento);
	}
	
});


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

function MostrarPag(){
//Mostrar Paginacion
const disginePag= document.querySelector("#pagination");
	  disginePag.classList.remove('ocultar');

}
  
//Variables Globales
  var pag=1;//5
  var escrol = false;
  var onevalue=0;
  var n=0;
  var a = document.querySelectorAll(".ub");


function nav(){

//ub -> ubicacion de la pagina 
  let ub=[];
  //vacia el array
  ub.length = 0;

	//Motor de la Paginacion
   for(let i=0;i<10;i++){
	//inicio empieza con 1
	if(pag==1 && i==0){
		ub[i]=pag;//1
	}
	//sumacion 1
    if(pag == 1 && i != 0){
	ub[i]=Number(pag)+Number(i);//2,3,4...
	}
	//sumacion 2
	if(pag !=1 && escrol == false){
	ub[i]=Number(pag)+Number(i+1);//11,12...
	}
	//Sumacion diferente al dar click en id="ultima"
	if(escrol == true){
		ub[i]= Number(n) + Number(i+1);

	}
	
	if(escrol==false){onevalue= Number(ub[0])- Number(1);}//activa la sumacion normal 1 y 2
	// console.log("ub=" + ub[i]);
   }


   	Numeracion(ub,a);
	//Click
	Pag(a);

	// console.log("valor q deve iniciar: " + n);
	// console.log("Primer valor: " + onevalue);
	if(escrol==true){onevalue= n;}
	   escrol=false;
}

//-------Numeracion-----------
function Numeracion(ub,a){
	let y=0;
	a.forEach((btn)=>{
		//Asigna los numeros
	 btn.innerText = ub[y]; 
	y++;
	});
}
//---------Click en Pag---------
function Pag(a){
	
    a.forEach((num) => {
		num.addEventListener('click', (e) => {
		
			var z =e.target.innerText;
			pagination(z);
			console.log(z);
		}); 
	});
}

//----------
function pagination(n){

	pag = n;
	// console.log(n);
	// console.log(ub);
	
	

	CargandoPeli();
}

const ultima= document.getElementById('ultima');
	ultima.addEventListener('click',()=>{
		for (let y = 0; y < 100; y+=10) {
			if(pag == y){
				console.log("click a ultima");
				nav();
			}
		}

	});


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


const BackPag = document.getElementById('BackPag').addEventListener('click',()=>{

	if(onevalue>=10){
		escrol = true;
		n=Number(onevalue) - Number(10);
		nav();
		}

});


