class ReviewsController < ApplicationController
  def index
  	@reviews = Review.all
  end

  def create
  	new_review = Review.create(title: params[:title], review: params[:review])
  	new_review.save
  	redirect_to root_path
  end

end
