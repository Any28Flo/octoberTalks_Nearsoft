var rutas = {
  urlApi:'https://spreadsheet.glitch.me/?key=1VrRvEMLlEzQwaCE3rj1m8XVyio-Lihu4ml1PlKsWqvM',
}
var plantillaTalleres = `
  <section>
  <div class="card-panel">
    <div class="row">
      <div>
        <h4> _horario_ </h4>
        <h5> Titulo_Evento </h5>
        <p> Nombre_Ponente</p>
        <div class="container">
          <div class="row" data-id= _evento_>
            <p class="center tag col s4 chip">_Lugar_</p>
            <p class="center tag col s4 chip">_Tipo_</p>
            <a href="#infoEvento" class="center col s4 mas modal-trigger" data-descripcion='_descripcion_' data-titulo='data_Titulo_Evento' data-horario='data_horario_' data-duracion='data_duracion' data-lugar='data_lugar' data-tipo='data_tipo' data-hrfinal='_horaFinal_' data-hrinicial='_horaInicial_'> Ver Más </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>`;
var contador = 0;
// var arregloTalleresAgregados = [];
function ObtenerDatos(respuesta){
  contador++;
   var horaInicio = Object.getOwnPropertyDescriptor(respuesta, "Hora Inicio").value;
   var titulo = respuesta.Tema;
   var ponente = respuesta.Ponente;
   var lugar = respuesta.Lugar;
   var descripcion = respuesta.Descripcion;
   var duracion = Object.getOwnPropertyDescriptor(respuesta, "Duracion (minutos)").value;
   var tipo=respuesta.Tipo;
   respuesta.idEvento = contador;
   var idEvento=respuesta.idEvento;
   var horaFinal=convertirHoraMilisegundos(horaInicio,duracion);
   var horaInicial = convertirHoraMilisegundos(horaInicio,0);
   console.log(horaFinal);

   var plantillaNueva = "";
       plantillaNueva += plantillaTalleres.replace('_horario_',horaInicio)
       .replace('Titulo_Evento',titulo)
       .replace('Nombre_Ponente',ponente)
       .replace('_evento_',idEvento)
       .replace('_Lugar_',lugar)
       .replace('_Tipo_',tipo)
       .replace('data_Titulo_Evento',titulo)
       .replace('data_horario_',horaInicio)
       .replace('data_duracion',duracion)
       .replace('data_lugar',lugar)
       .replace('data_tipo',tipo)
       .replace('_horaFinal_',horaFinal)
       .replace('_horaInicial_',horaInicial)
       .replace('_descripcion_',descripcion);
      $('#contenedorCharlas').append(plantillaNueva);

 }

function crearTarjetas (url){
    console.log(url);
    $.getJSON(url,function (response) {
    		console.log(response);
        response.forEach(function(respuesta){
          if(respuesta.Tipo == "Taller"){
            ObtenerDatos(respuesta);
          }

        });
    });
}
plantillaModal = ` <div class="modal-content">
			<div class="row fondo--azulMedio">
				<div class="col s1">
					<i class="material-icons modal-close">close</i>
				</div>
				<h4 class="center p-3 letra--blanca  col s10">_tituloEvento_</h4>
			</div>
          <a class="right btn-floating btn-large waves-effect waves-light fondo-Az-osc mt-015 izq-3"><i class="material-icons" id="btn-agregar">add</i></a>
          <h5>_horaInicio_</h5>
          <h6>_duracion_</h6>
          <h6 class='chip chip_tipo'> _Tipo_</h6>
          <h6 class="chip chip_lugar">_Lugar_</h6>
          <p class="justificar">
              _descripcion_
          </p>
        </div> `

function mostrarModal(e){
    var selector = $(e.target).data();
    copiarDatasEnBotonAgregar(selector);
    var horario =selector.horario;
    var titulo = selector.titulo;
    var descripcion = selector.descripcion;
    var duracion = selector.duracion;
    var tipo = selector.tipo;
    var lugar = selector.lugar;
    var plantillaNuevaModal = "";
        plantillaNuevaModal += plantillaModal.replace('_horaInicio_',horario)
        .replace('_tituloEvento_',titulo)
        .replace('_descripcion_',descripcion)
        .replace('data_tipo',tipo)
        .replace('_duracion_',duracion)
        .replace('_Lugar_',lugar)
        .replace('_Tipo_',tipo)
    $('#infoEvento').html(plantillaNuevaModal);


}
function copiarDatasEnBotonAgregar (setDatas){
  localStorage.setItem('dataEvento',JSON.stringify(setDatas));
  console.log(localStorage.dataEvento);

}
function convertirHoraMilisegundos (horaInicial,duracion){
    var dia = 22;
    var mes = 10;
    var year = 2017;
    var horaInicial = horaInicial.split(':');
    console.log(horaInicial);
    var minutos = parseInt(horaInicial[1]);
    var hora = parseInt(horaInicial[0]);
    var duracion = parseInt(duracion) * 60000;
    console.log(duracion);
    horaInicial = new Date(year,mes,dia,hora,minutos,0,0);
    var horaFinal= new Date()
    horaFinal.setTime(horaInicial.getTime()+ duracion);
    return(horaFinal.getTime());

}
var prueba = [];

function check (e){
  //*******************Función Agendar Evento***************
	// console.log(agregarEv.textContent);
  console.log(e.target);
  	$(e.target).text('check');

  var datas = (JSON.parse(localStorage.dataEvento));
  var arregloTalleresAgregados = (JSON.parse(localStorage.arregloTalleresAgregados));
  // prueba = arreg.map(function(evento){
  //       return {horaInicial: evento.hrFinal, horaFinal: evento.hrFinal};
  //   });
  // console.log(prueba);
  // console.log(arregloTalleresAgregados);
  //  if(arregloTalleresAgregados.length === 0){
  //    arregloTalleresAgregados.push(datas);
  //  }else{
  //    prueba = arregloTalleresAgregados.map(function(evento){
  //          return {horaInicial: evento.hrinicial, horaFinal: evento.hrfinal};
  //      });
  //  }
  //    console.log(prueba);
  //  }else {
  //   var hrfinalNuevo = datas.hrfinal;
  //   prueba = arregloTalleresAgregados.forEach(function(evento){
  //       return(evento);
  //   });
  // }
  // console.log(prueba);
  // convertirHoraMilisegundos(datas);
    arregloTalleresAgregados.push(datas);
   $(e.target).parent().addClass('disabled');
   localStorage.setItem('arregloTalleresAgregados',JSON.stringify(arregloTalleresAgregados));

	// tipo = 'check';

}
$(document).ready(function(){
    $('.modal').modal()
    $(".button-collapse").sideNav();
    $(document).on('click','.mas',mostrarModal);
    $(document).on('click','#btn-agregar',check);
    crearTarjetas(rutas.urlApi);
});
