function onLoad()
{
    var firestore = firebase.firestore();

    firestore.collection('restaurants').orderBy('lastOrderDate', 'asc')
    .get()
    .then(function(querySnapshot) {
        var restaurants = new Array();
        querySnapshot.forEach(function(restaurant) {
            name = restaurant.data().name;
            email = restaurant.data().email;
            lastOrderDate = restaurant.data().lastOrderDate;
            restaurants.push(
                {
                    name: name, 
                    email: email, 
                    lastOrderDate: lastOrderDate
                });
        })

        function AppViewModel() {
            var self = this;
         
            self.restaurants = ko.observableArray(restaurants);
         
            self.becomeThursdayChoice = function() {
                const restaurantLink = this.name.toLowerCase().replace(/[\s']+/g, ''); 
                firestore.doc('restaurants/'+restaurantLink)
                .update(
                    {lastOrderDate : '1970-01-01'}
                )
                .catch(err => {
                    console.log('Error update restaurant', err)
                  });
                window.alert("New Thursday choice selected!")
            }
        }

        ko.applyBindings(new AppViewModel());
        
    });
};
  