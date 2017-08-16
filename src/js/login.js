var config = {
    apiKey: "AIzaSyB5gXo7gw_oRD0OM5PnPg_JYBKsyiQGxGw",
    authDomain: "oktobertalks.firebaseapp.com",
    databaseURL: "https://oktobertalks.firebaseio.com",
    projectId: "oktobertalks",
    storageBucket: "",
    messagingSenderId: "684858871485"
  };
  firebase.initializeApp(config);


  var loginGoogle = function(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
			console.log(result)
		  var token = result.credential.accessToken;
		  var user = result.user;
		  localStorage.setItem('user', user.displayName);
		  localStorage.setItem('email', user.email);
		  location.href="../../index.html";

		}).catch(function(error) {
		  var errorMessage = error.message;
		  console.log("error",errorMessage);
		});
}

var google = document.getElementById("google");
google.addEventListener("click", loginGoogle);


