Rails.application.routes.draw do
  # devise_for :users, controllers: {
  # #DK: added ',controllers: {' and line below manually 11/16/18
  #   sessions: 'users/sessions'
  # }

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'
  get '/home/index', to: 'users/sessions#new', as: 'get_started'
  get '/location/locations', to: 'locations#show_map', as: 'show_map'
  post '/location/locations', to: 'locations#save', as: 'save_location'
  resources :users
  resources :reviews
  post '/location/locations', to: 'locations#create', as: 'save_location'

end
