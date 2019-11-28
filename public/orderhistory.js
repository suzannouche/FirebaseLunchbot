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
const saveButton = document.querySelector("#saveNameButton");
const tableOrders = document.querySelector("#orderhistory");

function loadOrderHistory() {

  var lastTenOrders = firestore.collection("orders").limit(10).get();
  lastTenOrders.then(querySnapshot => {
  //firestore.collection("orders").get().then(querySnapshot => {
      querySnapshot.forEach((order) => {
        
        console.log('log', order.data());

          var allRestaurantsPerOrder = []
          order.ref.collection("orderrestaurants").get().then(documents => {
              documents.docs.map(restaurant => {
              //console.log('Found subcollection with id:', restaurant.data().name);
              allRestaurantsPerOrder.push(restaurant.data().name);
            });
          });          
          console.log('all restaurants:', allRestaurantsPerOrder);
          addRow(tableOrders, allRestaurantsPerOrder, order.data().date, order.data().price, order.data().comment, order.data().id);

          if (order.data().id == 2) {
            var orderObj = firestore.collection("orders").where('id', '==', order.data().id).limit(1).get()
              .update({
              "comment": "updated comment"
              })
              .then(function() {
                console.log("Order comment successfully updated!");
              });
          }
      })
    });  
   };

function addCell(tr, val) {
  var td = document.createElement('td');
  td.innerHTML = val;
  tr.appendChild(td)
}

function addCellWithElement(tr, element) {
  var td = document.createElement('td');
  td.appendChild(element);
  tr.appendChild(td)
}

function addRow(tbl, restaurant, date, price, comment, orderId) {
  var tr = document.createElement('tr');
  addCell(tr, restaurant);
  addCell(tr, date);
  addCell(tr, price);

  var cmt = document.createElement("input");
  cmt.type= "text"
  cmt.value = comment
  addCellWithElement(tr, cmt);

  var btn = document.createElement('button');
  btn.innerHTML = "Save comment";
  btn.onclick = function saveComment(orderId, comment) {
    var orderObj = firestore.collection("orders").where('id', '==', orderId);
    orderObj.update({
      "comment": comment
      })
      .then(function() {
        console.log("Order comment successfully updated!");
      });
  }
  addCellWithElement(tr, btn);

  //use orderId for functioncall

  tbl.appendChild(tr)
}