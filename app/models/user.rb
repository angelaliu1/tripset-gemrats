class User < ApplicationRecord
  has_many :bookmarks
	has_many :routes_bookmarked, through: :bookmarks, source: :route
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
