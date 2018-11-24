//= require jquery
var map, searchBox, geocoder, place;
//set San Francisco as default location
var defaultLocation = "San Francisco";

function initMap() {
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12, disableDoubleClickZoom: true
    });

    //add search box to the map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));
    // searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    // google.maps.event.addListener(searchBox, 'places_changed', processPlacesSearch);





    var defaultBounds = new google.maps.LatLngBounds();
                var options = {
                bounds: defaultBounds
                };
    var input = document.getElementById('pac-input');
    var autocomplete  = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function() {
                    var bounds = new google.maps.LatLngBounds();
                    // Get place info
                    var place = autocomplete.getPlace();
                    // Do whatever with the value!
                    console.log(place.geometry.location.lat());
                    document.getElementById("location_name").value = place.name;
                    document.getElementById("location_latitude").value = place.geometry.location.lat();
                    document.getElementById("location_longitude").value = place.geometry.location.lng();

                    var marker = new google.maps.Marker({
                      map: map,
                      title: place.name,
                      position: place.geometry.location
                    });
                    // Create a marker for each place.
                    markers.push(marker);

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                    map.fitBounds(bounds);
                });




    // find user's geolocation, center map on it
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        //center map to default position
        var lat, lng, coords;
        geocoder.geocode({ 'address': defaultPlace }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                coords = {lat: latitude, lng: longitude};
            }
        });
        map.center(defaultPosititon);
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  var markers = [];

  function processPlacesSearch() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
      return;
      }
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });
          // Create a marker for each place.
          markers.push(marker);

          google.maps.event.addListener(marker, 'click', function() {
              // document.getElementById("location_name").value = place.name;
              // document.getElementById("location_latitude").value = place.geometry.location.lat();
              // document.getElementById("location_longitude").value = place.geometry.location.lng();
            });

          if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
          } else {
              bounds.extend(place.geometry.location);
          }
        });
      map.fitBounds(bounds);
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
