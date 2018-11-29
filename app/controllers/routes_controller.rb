class RoutesController < ApplicationController
  def index
    # explore all routes
    @routes = Route.all
  end

  def show
    # view own routes
    @curUser = current_user
    # @user = User.find(params[:id])
    @route = Route.find(params[:id])
    @locations = Location.where(routeid: @route.id).to_json
    #redirect_to '/routes/'+@route.to_s
    #redirect_to route_path(params[:id])
  end

  def new
    @route = Route.new
  end

  def create
    @route = Route.new(route_params)
		@route.upvotes = 0
		@route.user_id = current_user.id
    if @route.save
      redirect_to edit_route_path(@route[:id])
    else
      flash[:error] = @route.errors.full_messages.to_sentence
			redirect_to new_route_path
    end
  end

  def edit
    @route = Route.find(params[:id])
    @locations = Location.where(routeid: @route.id).to_json
  end

  def update
    @route = Route.find(params[:id])
    if @route.update! route_params
      redirect_to route_path(@route.id)
    else
			redirect_to :back, flash: { error: "Update failed" }
    end
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

  private
  def route_params
    params.require(:route).permit(:title, :description)
  end
end
