class RemoveReviewIdFromLocations < ActiveRecord::Migration[5.2]
  def change
    remove_column :locations, :review_id, :integer
  end
end
