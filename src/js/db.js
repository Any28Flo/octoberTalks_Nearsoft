
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
</script>

var usuariosDb = {
  usuarios:[],
  // recompensas: []


}
var usuarios     = firebase.database().ref("usuarios");

var insertaUsuario = function(e){
e.preventDefault();

var nombre = localStorage.usuario;
var email = localStorage.email;

usuarios.set({
  "nombre": nombre,
  "email" : email

});
// setTimeout(function(){location.href="../views/principal.html" }, 1000);

};

$(window).load(function () {
  insertaUsuario();
  // $("#formulario_recompensas").submit(enviaRecompensa);
  // $("#registroNuevoUsuario").submit(insertaUsuario);

});
