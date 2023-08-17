
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
					<div onclick="info()" class="pelicula" id="${peli.id}">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
						<h3 class="titulo">${peli.title}</h3>
						<p class="blockquote-footer">${peli.overview}</p>
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
//add event
const contenedor = getEle;

// var divPeli;
// console.log(divPeli);

// divPeli.addEventListener('click', () =>{

// 	var id=divPeli.id;
// 	console.log(id);
// });


// function info(peli){
// 	console.log(peli)
// }
 

const btnopen= document.getElementById('open');

btnopen.addEventListener('show.bs.modal',e =>{

    btnopen = e.relatedTarget
});


// const exampleModal = document.getElementById('exampleModal')
// if (exampleModal) {
//   exampleModal.addEventListener('show.bs.modal', event => {
//     // Button that triggered the modal
//     const btnopen = event.relatedTarget
   
//   })
// }




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