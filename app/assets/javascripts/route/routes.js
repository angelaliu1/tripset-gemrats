//= require jquery
var map, searchBox, geocoder, place;
//set San Francisco as default location
var defaultLocation = "San Francisco";

function initMap() {
    var bounds = new google.maps.LatLngBounds();
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12, disableDoubleClickZoom: true
    });

    //add search box to the map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));
    var defaultBounds = new google.maps.LatLngBounds();
    var options = {bounds: defaultBounds};
    var input = document.getElementById('pac-input');
    var autocomplete  = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function() {
          // var bounds = new google.maps.LatLngBounds();
          // Get location's info
          var place = autocomplete.getPlace();
          document.getElementById("location_name").value = place.name;
          document.getElementById("location_latitude").value = place.geometry.location.lat();
          document.getElementById("location_longitude").value = place.geometry.location.lng();

          var marker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
          });

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

    // var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < json_loc.length; i++){
         var marker = new google.maps.Marker({
             position: new google.maps.LatLng(json_loc[i].latitude, json_loc[i].longitude),
             title: json_loc[i].name,
             map: map
         });
         //extend the bounds to include each marker's position
          bounds.extend(marker.position);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
     }

     //now fit the map to the newly inclusive bounds
     map.fitBounds(bounds);

    //  var listener = google.maps.event.addListener(map, "idle", function () {
    //     map.setZoom(4);
    //     google.maps.event.removeListener(listener);
    // });
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
