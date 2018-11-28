class Review < ApplicationRecord
  belongs_to :route, optional: true
end
