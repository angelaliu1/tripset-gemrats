class LocationsController < ApplicationController

  def show_map
    # @ip = request.env['HTTP_X_REAL_IP']
    # location = Geocoder.search(@ip)
    #@latitude = 33
    #@longitude = -122
    render '/location/locations'
  end

end
