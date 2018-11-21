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
    markers = [];

    // For each place, get the icon, name and location.
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

        //add button to the marker's infowindow on marker click
        // infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
            //infowindow.setContent("<div>" + place.name + "<br><input type='submit' id='butSubmit' value='Add this location' onclick='SaveLocation()'><div id='bar'></div></div>");
            //infowindow.open(map, this);
            //alert('before ajax');
            // $.ajax({url: "www.google.com", type: "GET"});
            // $.post("/locations/save", {name: place.name, latitutde: place.geometry.location.lat(), longitude: place.geometry.location.lng()});



            //$("#s_ip").val('[' + place.geometry.location.A + ',' + place.geometry.location.F + ']')
            //$('#name').val(place.name)
            document.getElementById("name").value = place.name;



               // $.ajax({
               // url: "/locations/",
               // type: "get",
               // data: {name: places.name},
               // dataType: "json",
               // success: function(data) {
               //     alert('successfully');
               //   }
               // });

            // $.ajax({
                 // url: "/locations/save_location",
                 // type: "POST",
                 // data: {name : place.name, latitude : place.geometry.location.lat(), longitude : place.geometry.location.lng()},
                 // dataType: "json",
                 // success: function(data) {
                 //     alert('successfully');
                 //   }
                 // });
          });

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
    map.fitBounds(bounds);
    }

    // function processButtonSearch(location) {
    //   geocoder = new google.maps.Geocoder();
    //   geocoder.geocode(location, function (data) {
    //     var lat = data[0].geometry.location.lat();
    //     var lng = data[0].geometry.location.lng();
    //     var origin = new google.maps.LatLng(lat, lng);
    //     // plot origin
    //   });
    // }

      //make ajax request via jquery to render a form to save location
      // function SaveLocation() {
      //   $.ajax({
      //      url: "/locations/save",
      //      type: "POST",
      //      data: {name : place.name, latitude : place.geometry.location.lat(), longitude : place.geometry.location.lng()},
      //      dataType: "json",
      //      success: function(data) {
      //          alert('successfully');
      //        }
      //      });

          //$.ajax("/location/_form");

          // $.ajax({
          //   url: "/user_notifications/render_read",
          //   type: 'PUT'
          // });

          //example of using ajax to pass data from js to rails
          // $.ajax({
          //    url: "/product_details/show",
          //    type: "POST",
          //    data: {"cbo_id" : $(this).val()},
          //    dataType: "json",
          //    success: function(data) {
          //        alert('successfully');
          //      }
          //    });
          // #app/controllers/product_details_controller.rb
          // Class ProductDetailsController < ApplicationController
          //    respond_to :js, :json, :html
          //
          //    def show
          //       @product = Product.find params[:id]
          //       respond_with @product
          //    end
          // end
      // }




function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
