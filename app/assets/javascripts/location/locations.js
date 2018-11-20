//= require jquery
<<<<<<< HEAD
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
    var defaultBounds = new google.maps.LatLngBounds();
    var options = {bounds: defaultBounds};
    var input = document.getElementById('pac-input');
    var autocomplete  = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function() {
          var bounds = new google.maps.LatLngBounds();
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
  }

  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
  }

  function processPlacesSearch() {
    var places = searchBox.getPlaces();
    if (places.length) {
      location = places[0].geometry.location;
      var origin = new google.maps.LatLng(location.lat, location.lng);
      // plot origin
    }
  }

  function processButtonSearch(location) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode(location, function (data) {
      var lat = data[0].geometry.location.lat();
      var lng = data[0].geometry.location.lng();
      var origin = new google.maps.LatLng(lat, lng);
      // plot origin
    });
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
