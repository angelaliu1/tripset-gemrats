class LocationsController < ApplicationController
  #skip_before_action :verify_authenticity_token
  #respond_to :js, :json, :html

  def index
  end

  def new
      @Location = Location.new
  end

  def show_map
    # @ip = request.env['HTTP_X_REAL_IP']
    # location = Geocoder.search(@ip)
    #@latitude = 33
    #@longitude = -122
    render '/location/locations'
  end


  def create
    #puts params.inspect
    # Rails.logger.debug params.inspect
    # raise params.inspect
    #render plain: params[:location].inspect

    #name = location_params[:name]
    # #latitude = params[:latitude]
    # #longitude = params[:longitude]
    # #@location = Location.new(name: name, latitude: latitude, longitude: longitude)
    #@location = Location.new(name: name, latitude: 1.0, longitude: 1.0)


    @location = Location.new(location_params)

    if @location.save
      flash[:notice] = "Location added!"
      render '/home/index'
    else
      flash[:error] = @location.errors.full_messages.to_sentence
      render 'location/locations'
    end
  end


  # def create
  #     pokemonName = pokemon_params[:name]
  #     ndex = pokemon_params[:ndex]
  #     @pokemon = Pokemon.new(name: pokemonName, ndex: ndex, health: 100, level: 1, trainer_id: current_trainer.id)
  #
  #     if @pokemon.save
  #         flash[:notice] = "You created a new Pokemon!"
  #         redirect_to '/trainers/'+current_trainer.id.to_s
  #     else
  #         flash[:error] = @pokemon.errors.full_messages.to_sentence
  #         render 'pokemons/new'
  #     end
  # end

  private
      # Using a private method to encapsulate the permissible parameters
      # is just a good pattern since you'll be able to reuse the same
      # permit list between create and update. Also, you can specialize
      # this method with per-user checking of permissible attributes.
      def location_params
        params.require(:location).permit(:name, :latitude)   #require makes sure key 'location' is in the hash
      end             #permit returns only two values specified from the hash of values of 'location' key

end
