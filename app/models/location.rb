class Location < ApplicationRecord
  belongs_to :route, optional: true
  #has_and_belongs_to_many :routes
end
