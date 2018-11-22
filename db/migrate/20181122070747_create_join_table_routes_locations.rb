class CreateJoinTableRoutesLocations < ActiveRecord::Migration[5.2]
  def change
    create_join_table :routes, :locations do |t|
      # t.index [:route_id, :location_id]
      # t.index [:location_id, :route_id]
    end
  end
end
