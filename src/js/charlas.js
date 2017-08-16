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
            <a href="#infoEvento" class="center col s4 mas modal-trigger" data-descripcion='_descripcion_' data-titulo='data_Titulo_Evento' data-horario='data_horario_' data-duracion='data_duracion' data-lugar='data_lugar' data-tipo='data_tipo'> Ver Más </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>`;
var contador = 0;
var arregloTalleresAgregados = [];
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
       .replace('_descripcion_',descripcion);
      $('#contenedorCharlas').append(plantillaNueva);

 }

function crearTarjetas (url){
    console.log(url);
    $.getJSON(url,function (response) {
    		console.log(response);
        response.forEach(function(respuesta){
          if(respuesta.Tipo == "Platica"){
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

function check (e){
  //*******************Función Agendar Evento***************
	// console.log(agregarEv.textContent);
  console.log(e.target);
  	$(e.target).text('check');
  var datas = (JSON.parse(localStorage.dataEvento));
  arregloTalleresAgregados.push(datas);
  $(e.target).parent().addClass('disabled');
  console.log(arregloTalleresAgregados);
  localStorage.setItem('arregloEventosAgregados',JSON.stringify(arregloTalleresAgregados));

	// tipo = 'check';

}
$(document).ready(function(){
    $('.modal').modal()
    $(document).on('click','.mas',mostrarModal);
    $(document).on('click','#btn-agregar',check);
    crearTarjetas(rutas.urlApi);
});
