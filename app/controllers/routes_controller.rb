class RoutesController < ApplicationController
  def index
    # explore all routes
    @routes = Route.all

  end

  def show
    # view own routes
    @user = User.find(params[:id])
  end

  def new
  end

  def create
  end

  def edit
  end

  def bookmark
    @route = Route.find(params[:id])
    # todo: prevent duplicate likes
	  @bookmark = Bookmark.create(user: current_user, route: @route)
	  redirect_to routes_path # or to '/routes'
  end

  def upvote
    route = Route.find(params[:id])
    route.upvotes += 1
		route.save
  end
end
