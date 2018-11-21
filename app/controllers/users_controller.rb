class UsersController < ApplicationController
    before_action :authenticate_user!

    def index
        @user = User.find(current_user.id)
        @reviews = Review.where(user_id: @user.id)
        # @routes = Route.where(user_id: @user.id)
    end
end
