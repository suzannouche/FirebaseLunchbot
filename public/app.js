var firebaseConfig = {
    apiKey: "AIzaSyBb5MN5zQ_nt2mfPVR20Lq42Q_NoEn4fu8",
    authDomain: "lunchbot-e1c26.firebaseapp.com",
    databaseURL: "https://lunchbot-e1c26.firebaseio.com",
    projectId: "lunchbot-e1c26",
    storageBucket: "lunchbot-e1c26.appspot.com",
    messagingSenderId: "393610573568"
  };
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const docRef = firestore.doc("restaurants/NAMD");
const inputTextField = document.querySelector("#textfield");
const saveButton = document.querySelector("#saveNameButton");

saveButton.addEventListener("click", function(){

    const priceData = {
        price: 111
    }
    docRef.set(priceData)
    .then(function() {console.log("Price saved")})
    .catch(function (error) { console.log("Got an error: ", error)});
})
