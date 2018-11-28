# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

[
    ['Meep', 'meep'],
    ['Meep', 'meep'],
    ['Meep', 'meep'],
    ['Meep', 'meep']
].each do |title, review, rating|
  Review.create(
    title: title,
    review: review,
    rating: rand(1..5),
    user_id: 1
    )
end

# Make Location
[
    ['Sather Gate', 1.0, 1.0],
    ['UCB', 2.0, 2.0]
].each do |name, latitude, longitude|
  Location.create(
    name: name,
    latitude: latitude,
    longitude: longitude
  )
end

[
    ['meep', 'Inverness, CA', 87],
    ['meep', 'Point Reyes Station, CA', 68],
    ['meep', 'Berkeley, CA', 52]
].each do |title, city, upvotes|
    Route.create(
        title: title,
        city: city,
        upvotes: upvotes,
        user_id: 1
    )
end
