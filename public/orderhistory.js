function onLoad()
{
  var firestore = firebase.firestore();
      firestore.collection("orders").orderBy('date', 'desc')
      .limit(20)
      .get()
      .then(function (querySnapshot) {
          var allRestaurantsPerOrder = new Array();
           querySnapshot.forEach(function(order) {
                allRestaurantsPerOrder.push(
                {
                      name: order.data().name,
                      date: order.data().date,
                      price: order.data().price,
                      comment: order.data().comment
                });
          });

          function AppViewModel() {
            var self = this;
          
            self.allRestaurantsPerOrder = ko.observableArray(allRestaurantsPerOrder);
          
            self.saveComment = function() {
                const restaurantLink = this.name.toLowerCase().replace(/[\s']+/g, ''); 
                firestore.doc('orders/order'+this.date+restaurantLink)
                .update({comment : this.comment})
                .catch(err => {
                  console.log('Error getting orders', err)
                });  
                
                window.alert("New comment saved");
              }
          }
      
          ko.applyBindings(new AppViewModel());


          }
          )    
    .catch(err => {
      console.log('Error getting orders', err)
    });
};
