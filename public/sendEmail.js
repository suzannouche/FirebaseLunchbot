var firestore = firebase.firestore();

const sendDirectEmailButton = document.querySelector("#sendDirectEmailButton");

sendDirectEmailButton.addEventListener("click", function(){
    const date = document.querySelector("#deliveryDateId");
    const totalPrice = document.querySelector("#totalPriceId");
    var restaurantName = document.querySelector("#restaurantNameId");
    var email = document.querySelector("#emailId");
    var orderMessage = document.querySelector("#msgId");

    var data = 
    {
        subject: '[PartsTrader] Thursday lunch ' + date,
        dest: email,
        body: orderMessage 
    }

    const userAction = function () {
        const response = fetch('https://us-central1-lunchbot-e1c26.cloudfunctions.net/sendMail', {
            method: 'POST',
            body: JSON.stringify(data), 
            headers: {
            'Content-Type': 'application/json'
            }
        });
    }

    userAction();

    const docOrder = firestore.doc("orders/order"+date);
    const orderInfo = {
        comment: "",
        date: date
    }

    docOrder.set(orderInfo)
    .then(function() {console.log("Order saved")})
    .catch(function (error) { console.log("Got an error: ", error)});

    transformedRestaurantName = restaurantName.value.trim().toLowerCase(); 
    docOrderRestaurant = firestore.doc("restaurants/"+transformedRestaurantName);
    const orderRestaurantInfo = {
        name: restaurantName,
        email: email,
        lastOrder: emailBodyWithDate,
        totalPrice: totalPrice
    }
    docOrderRestaurant.set(orderRestaurantInfo)
    .then(function() {console.log("Restaurant saved")})
    .catch(function (error) { console.log("Got an error: ", error)});

});
