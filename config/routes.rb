Rails.application.routes.draw do
  devise_for :users, controllers: {
  #DK: added ',controllers: {' and line below manually 11/16/18
    sessions: 'users/sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  #DK: added this line manually 11/16/18
  root to: 'home#index'
end
