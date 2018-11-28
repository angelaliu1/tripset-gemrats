class AddRouteidToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :routeid, :integer
  end
end
