class ChangeLongitudeToBeFloatInLocations < ActiveRecord::Migration[5.2]
  def change
      change_column :locations, :longitude, :float
  end
end
