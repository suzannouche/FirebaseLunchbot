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

/*saveButton.addEventListener("click", function(){

    const priceData = {
        price: 111
    }
    docRef.set(priceData)
    .then(function() {console.log("Price saved")})
    .catch(function (error) { console.log("Got an error: ", error)});
})


// https://us-central1-lunchbot-e1c26.cloudfunctions.net/sendMail*/

const todayChoice = 'chillimasala';

const docRef = firestore.doc("restaurants/"+todayChoice);
docRef.get()
.then(function(doc) {

    if (doc.exists) {
        const todayChoiceName = doc.data().name;
        document.querySelector("#restaurantNameId").value = todayChoiceName;
        var d = new Date();
        d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
        const temp = d.toJSON().slice(0, 10); 
        const nDate = temp.slice(0, 4) + '-' + temp.slice(5, 7) + '-' + temp.slice(8, 10); 
        document.querySelector("#deliveryDateId").value = nDate;

        //const lastOrderReadRef = firestore.collection("orders").orderBy('id', 'desc');
        firestore.collectionGroup('orderrestaurants').where('name', '==', todayChoiceName)
        .orderBy('id','desc')
        .limit(1)
        .get()
        .then(
            function(querySnapshot) {
                querySnapshot.forEach(function(lastRestaurant) {
                    document.querySelector("#msgId").value = lastRestaurant.data().lastOrder;
                    document.querySelector("#totalPriceId").value = lastRestaurant.data().totalPrice;
                    document.querySelector("#emailId").value = lastRestaurant.data().email;
                    //doc.data().body.replace(/\d{2}-\d{2}-\d{4}/g, date);
                });
            
            // function(lastRestaurant){
            // if (lastRestaurant.exists) {
            //     document.querySelector("#msgId").innerHTML = lastRestaurant.data().lastOrder;
            //     document.querySelector("#totalPriceId").innerHTML = lastRestaurant.data().totalPrice;
            // doc.data().body.replace(/\d{2}-\d{2}-\d{4}/g, date);
            // }
        }
        
        );
    
       
    }})
.catch(function (error) { console.log("Got an error: ", error)});
