var plantillaTalleres = `
  <section>
  <div class="card-panel">
    <div class="row">
      <div>
        <h4> _horario_ </h4>
        <h5> Titulo_Evento </h5>

        <div class="container">
          <div class="row" data-id= _evento_>
            <p class="center tag col s4 chip">_Lugar_</p>


          </div>
        </div>
      </div>
    </div>
    </div>
  </section>`;


var muestraNombreUsuario = function(){
  var usuarioNombre = localStorage.getItem('user');
  console.log(usuarioNombre)
  $("#usuario").text(usuarioNombre);
}


var muestraDatos = function(){

  var elementos = localStorage.arregloEventosAgregados;
 var elementojson= JSON.parse(elementos);
 if(elementojson.length === 0 ){
   alert("no hay elementos");
 }else {
   console.log(elementojson);
   elementojson.forEach(function (elementos){

    //  console.log(elementos.tipo);
     var titulo = elementos.titulo;
     var horario = elementos.horario;
     var lugar = elementos.lugar;

    //  console.log(elementos.lugar);
    //  console.log(elementos.horario);
     var plantillaNueva = "";
         plantillaNueva += plantillaTalleres.replace('_horario_',horario)
         .replace('Titulo_Evento',titulo)
         .replace('_Lugar_',lugar)

        $('#listaCharlas').append(plantillaNueva);



   })
 }

}


var muestraTalleres = function(){

  var elementos = localStorage.arregloTalleresAgregados;
 var elementojson= JSON.parse(elementos);
 if(elementojson.length === 0 ){
   alert("no hay elementos");
 }else {
   console.log(elementojson);
   elementojson.forEach(function (elementos){

    //  console.log(elementos.tipo);
     var titulo = elementos.titulo;
     var horario = elementos.horario;
     var lugar = elementos.lugar;

    //  console.log(elementos.lugar);
    //  console.log(elementos.horario);
     var plantillaNueva = "";
         plantillaNueva += plantillaTalleres.replace('_horario_',horario)
         .replace('Titulo_Evento',titulo)
         .replace('_Lugar_',lugar)

        $('#listaTalleres').append(plantillaNueva);



   })
 }

}


$(document).ready(function(){
  muestraNombreUsuario();
  muestraDatos();
  muestraTalleres();
});
