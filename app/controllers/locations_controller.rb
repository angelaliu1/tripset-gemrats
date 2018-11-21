class LocationsController < ApplicationController
  #skip_before_action :verify_authenticity_token
  #respond_to :js, :json, :html

  def index

  end

  def show_map
    # @ip = request.env['HTTP_X_REAL_IP']
    # location = Geocoder.search(@ip)
    #@latitude = 33
    #@longitude = -122
    render '/location/locations'
  end

  def save
    name = params[:name]
    #latitude = params[:latitude]
    #longitude = params[:longitude]
    #@location = Location.new(name: name, latitude: latitude, longitude: longitude)
    @location = Location.new(name: name)

    if @location.save
      flash[:notice] = "Location added!"
      #render '/home/index'
    else
      flash[:error] = @location.errors.full_messages.to_sentence
      #render 'location/locations'
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

end
