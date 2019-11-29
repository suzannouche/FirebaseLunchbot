var firestore = firebase.firestore();

var restaurantEmail;
var todayChoiceName;
firestore.collection('restaurants').orderBy('lastOrderDate', 'asc')
.limit(1)
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(choice) {
        document.querySelector("#restaurantNameId").value = choice.data().name;
        todayChoiceName = choice.data().name;
        restaurantEmail = choice.data().email;
    })
    firestore.collection('orders').where('name', '==', todayChoiceName)
    .orderBy('date','asc')
    .limit(1)
    .get()
    .then(
        function(querySnapshot) {
            querySnapshot.forEach(function(lastRestaurant) {
                var lastOrderMessage = lastRestaurant.data().lastOrder;
                document.querySelector("#msgId").value = lastOrderMessage.replace(/\d{2}-\d{2}-\d{4}/g, nDate);
                document.querySelector("#totalPriceId").value = lastRestaurant.data().price;
                document.querySelector("#emailId").value = lastRestaurant.data().email;
            });

            // next Thursday delivery date
            var d = new Date();
            d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
            const temp = d.toJSON().slice(0, 10); 
            const nDate = temp.slice(0, 4) + '-' + temp.slice(5, 7) + '-' + temp.slice(8, 10); 
            document.querySelector("#deliveryDateId").value = nDate;

            if (document.querySelector("#emailId").value == "")
            {
               document.querySelector("#emailId").value = restaurantEmail;
            }
    } 
    );
})
.catch(function (error) { console.log("Got an error: ", error)});




