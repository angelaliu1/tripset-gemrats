class LocationsController < ApplicationController

  def show_map
    render '/location/locations'
  end


  def create
    # render plain: params[:location].inspect     #for debuggin purposes

    loc_name = location_params[:name]
    lat = location_params[:latitude]
    long = location_params[:longitude]

    @location = Location.new(name: loc_name, latitude: lat, longitude: long)

    if @location.save!
      flash[:notice] = "Location added!"
      render 'location/locations'
    else
      flash[:error] = @location.errors.full_messages.to_sentence
      render '/home/index'
    end
  end


  private
      # A private method to encapsulate the permissible parameters
      #require makes sure key 'location' is in the hash
      #permit returns only two values specified from the hash of values of 'location' key
      def location_params
        params.require(:location).permit(:name, :latitude, :longitude)
      end
end
