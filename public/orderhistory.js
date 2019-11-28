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
      querySnapshot.forEach((order) => {
        
        console.log('log', order.data());

          var allRestaurantsPerOrder = []
          order.ref.collection("orderrestaurants").get()
          .then(documents => {
              documents.docs.map(restaurant => {
              //console.log('Found subcollection with id:', restaurant.data().name);
              allRestaurantsPerOrder.push(restaurant.data().name);
            });
          })
          .catch(err => {
            console.log('Error getting subcollections', err)
          });

          console.log('all restaurants:', allRestaurantsPerOrder);
          addRow(tableOrders, allRestaurantsPerOrder, order.data().date, order.data().price, order.data().comment, order.data().id);

      //  if (order.data().id == 2)   {
      //       firestore.collection("orders").where('id', '==', order.data().id).get()
      //       .then(snapshot => {
      //           snapshot.forEach((order) => {
      //             console.log('order', order.ref);      
      //             order.ref.update({
      //               comment: "this is"
      //               })
      //               .then(function() {
      //                 console.log("Order comment successfully updated!");
      //               })
      //           });     
      //       });
      //   }
      })
    })
    .catch(err => {
      console.log('Error getting orders', err)
    });;  
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

function saveComment(orderId) {
  const inputValue  = document.querySelector("#order_" + orderId).value;
  firestore.collection("orders").where("id", "==", orderId).get()
  .then(function(snapshot) {
      snapshot.forEach(function(order) {
        console.log('order', order.ref);      
        order.update({
          comment: inputValue
          })
          .then(function() {
            console.log("Order comment successfully updated!");
          })
      });     
  })
  .catch(function(error){console.log(error);});
}

function addRow(tbl, restaurant, date, price, comment, orderId) {
  var tr = document.createElement('tr');
  addCell(tr, restaurant);
  addCell(tr, date);
  addCell(tr, price);

  var cmt = document.createElement("input");
  cmt.type = "text";
  cmt.id = "order_" + orderId;
  cmt.value = comment;
  addCellWithElement(tr, cmt);

  var btn = document.createElement('button');
  btn.id = orderId;
  btn.innerHTML = "Save comment";
  // firestore.collection('orders').doc(order.id).update({comment: orderId})
      // .then(function() {
      //   console.log("Order comment successfully updated!");
      // });

  btn.onclick = function(){saveComment(orderId)};
  
  addCellWithElement(tr, btn);

  tbl.appendChild(tr)
}


