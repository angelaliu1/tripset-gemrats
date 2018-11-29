class LocationsController < ApplicationController
  #skip_before_action :verify_authenticity_token
  #respond_to :js, :json, :html

  def index

  end

  def new
      @Location = Location.new
  end

  def show_map
    render '/location/locations'
  end


  def create
     #render plain: params.inspect     #for debuggin purposes

      loc_name = location_params[:name]
      lat = location_params[:latitude]
      long = location_params[:longitude]
      route_id = location_params[:routeid]

      @location = Location.new(name: loc_name, latitude: lat, longitude: long, routeid: route_id)

      if @location.save!
        flash[:notice] = "Location added!"
        redirect_to edit_route_path(@location.routeid)
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
        params.require(:location).permit(:name, :latitude, :longitude, :routeid)
      end

end
