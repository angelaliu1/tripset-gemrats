class ReviewsController < ApplicationController
  def index
  	@reviews = Review.all
  end

  def create
  	new_review = Review.create(title: params[:title], rating: params[:rating], review: params[:review], user_id: current_user)
  	new_review.save
  	redirect_to root_path
  end

end
