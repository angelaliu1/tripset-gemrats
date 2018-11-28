class Location < ApplicationRecord
  belongs_to :route
  #has_and_belongs_to_many :routes
end
