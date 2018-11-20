//= require jquery
var map, searchBox, geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.77, lng: -122.43}, zoom: 12, disableDoubleClickZoom: true
    });
    infoWindow = new google.maps.InfoWindow;

    //add search box to the map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));
    searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    google.maps.event.addListener(searchBox, 'places_changed', processPlacesSearch);

    // find user's geolocation, center map on it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    var marker = new google.maps.Marker({position: {lat: 37.77, lng: -122.43}, map: map});

    //Listen for the event fired when the user selects an item from the
    //pick list. Retrieve the matching places for that item.
    // google.maps.event.addListener(searchBox, 'places_changed', function() {
    //     var places = searchBox.getPlaces();
    //
    //     if (places.length == 0) {
    //       return;
    //     }
    //     for (var i = 0, marker; marker = markers[i]; i++) {
    //       marker.setMap(null);
    //     }
    //
    //     // For each place, get the icon, place name, and location.
    //     markers = [];
    //     var bounds = new google.maps.LatLngBounds();
    //     for (var i = 0, place; place = places[i]; i++) {
    //       var image = {
    //         url: place.icon,
    //         size: new google.maps.Size(71, 71),
    //         origin: new google.maps.Point(0, 0),
    //         anchor: new google.maps.Point(17, 34),
    //         scaledSize: new google.maps.Size(25, 25)
    //       };
    //
    //       // Create a marker for each place.
    //       var marker = new google.maps.Marker({
    //         map: map,
    //         icon: image,
    //         title: place.name,
    //         position: place.geometry.location
    //       });
    //
    //       markers.push(marker);
    //
    //       bounds.extend(place.geometry.location);
    //     }
    //
    //     map.fitBounds(bounds);
    //   });
    //   // [END region_getplaces]
    //
    //   // Bias the SearchBox results towards places that are within the bounds of the
    //   // current map's viewport.
    //   google.maps.event.addListener(map, 'bounds_changed', function() {
    //     var bounds = map.getBounds();
    //     searchBox.setBounds(bounds);
    //   });
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
