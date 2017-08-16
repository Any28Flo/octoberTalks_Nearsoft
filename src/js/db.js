
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5gXo7gw_oRD0OM5PnPg_JYBKsyiQGxGw",
    authDomain: "oktobertalks.firebaseapp.com",
    databaseURL: "https://oktobertalks.firebaseio.com",
    projectId: "oktobertalks",
    storageBucket: "oktobertalks.appspot.com",
    messagingSenderId: "684858871485"
  };
  firebase.initializeApp(config);
var usuariosDb = {
  usuarios:[],
  charlas:[]


}
var usuarios     = firebase.database().ref("usuarios");
var charlas     = firebase.database().ref("/");

var insertaUsuario = function(){
    var nombre = localStorage.user;

    var email = localStorage.email;

    usuarios.push({
      "nombre": nombre,
      "email" : email

    });
// setTimeout(function(){location.href="../views/principal.html" }, 1000);

};
var insertaCharlas = function(){
  var lista_de_talleres = [];
    var nombre = localStorage.user;
    var email = localStorage.email;
    var arrayTalleres= localStorage.arregloEventosAgregados;
    var objTalleres = JSON.parse(arrayTalleres);
    var descripcioonUsuario = {
        nombre ,
        email ,
        lista_de_talleres
    }


    for (var i= 0 ; i< objTalleres.length ; i++){

      var titulo= objTalleres[i].titulo;
      var tipo= objTalleres[i].tipo;
      var lugar =  objTalleres[i].lugar;
      var duracion =  objTalleres[i].duracion;
      var taller ={
        tituloCharla: titulo,
        tipoCharla : tipo,
        lugarCharla:lugar,
        duracionCharla:duracion
      }
      lista_de_talleres.push(taller);
    }
    descripcioonUsuario.nombre=nombre;
    descripcioonUsuario.email = email;
    descripcioonUsuario.lista_de_talleres = lista_de_talleres;


    usuarios.push({
       "usuario":descripcioonUsuario
    })

};
$( document ).ready(function() {
      // insertaUsuario();
      insertaCharlas();
});
