//= require jquery

function initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.77, lng: -122.43}, zoom: 12, disableDoubleClickZoom: true
    });
    infoWindow = new google.maps.InfoWindow;

    //add search box to the map
    var searchInput = document.getElementById('pac-input');
    var searchBtn = document.getElementById('search-button');
    var searchBox = new google.maps.places.SearchBox(searchInput);

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

    map.addListener('dblclick', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    });

    var marker = new google.maps.Marker({position: {lat: 37.77, lng: -122.43}, map: map});
  }

  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
