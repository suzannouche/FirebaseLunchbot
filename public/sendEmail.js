var firestore = firebase.firestore();

const sendDirectEmailButton = document.querySelector("#sendDirectEmailButton");

sendDirectEmailButton.addEventListener("click", function(){
    const nDate = document.querySelector("#deliveryDateId").value;
    const totalPrice = document.querySelector("#totalPriceId").value;
    var restaurantName = document.querySelector("#restaurantNameId").value;
    var email = document.querySelector("#emailId").value;
    var orderMessage = document.querySelector("#msgId").value;

    var data = 
    {
        subject: '[PartsTrader] Thursday lunch ' + nDate,
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

    transformedRestaurantName = restaurantName.toLowerCase().replace(/[\s']+/g, ''); 
    const docOrder = firestore.doc("orders/order"+nDate+transformedRestaurantName);
    const orderInfo = {
        comment: "",
        date: nDate,
        email: email,
        lastOrder: orderMessage,
        name: restaurantName,
        price: totalPrice
    }

    docOrder.set(orderInfo)
    .then(function() {console.log("Order saved")})
    .catch(function (error) { console.log("Got an error: ", error)});


    docRestaurant = firestore.doc("restaurants/"+transformedRestaurantName);
    const orderRestaurantInfo = {
        name: restaurantName,
        email: email,
        lastOrder: orderMessage,
        totalPrice: totalPrice,
        lastOrderDate: nDate
    }
    docRestaurant.set(orderRestaurantInfo)
    .then(function() {console.log("Restaurant saved")})
    .catch(function (error) { console.log("Got an error: ", error)});

    window.alert("New order sent!");
});
