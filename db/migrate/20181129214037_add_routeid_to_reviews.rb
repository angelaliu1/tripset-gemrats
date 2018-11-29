class AddRouteidToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :routeid, :integer
  end
end
