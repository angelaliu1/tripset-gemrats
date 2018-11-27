class Review < ApplicationRecord
  belongs_to :location, optional: true
end
