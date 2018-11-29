# Tripset

**Team Members:** Angela Liu, Victor Grajski, Candice Ye, Daphne Jong, Dmytro Khelemendyk, Jennifer Grannen

**Prompt:** Come Up With Your Own Prompt!

## **Abstract**

**Tripset** is a tool for people who want to explore the hottest spots in their (or any) city! Users can create routes and post them to a public map, search for routes created by other users, and bookmark their favorite routes before they embark on their adventures.

## **Models:**

**User**

- Username
- Email
- Password
- List of Route IDs
- List of Bookmarked Routes
- List of Reviews

**Routes (Trip plan) - Itinerary**

- Title
- City
- List of Categories
- Route ID
- Upvotes
- User (Owner)
- List of pins (has and belongs to many, join table)
- Editable by owner
- Deletable by owner
- Bookmarked by (routes has many users through: bookmarks? Then need bookmarks model as join)

**Pin (Location)**

- Name
- Location Coordinates
- Reviews
- List of Categories
- Photo of place
- Hours
- Routes that the pin is used in

**Reviews**

- User (Owner)
- Route
- Title
- Rating
- Content

**Category**

- Name
- List of pins that fall under category
- List of routes that fall under category

## **Relationships:**

- Many-to-many: Routes contain pins, pins assigned to routes
- One-to-many: Users own many routes
- One-to-many: Users own many bookmarks
- One-to-many: Users own many reviews
- One-to-many: Pins have many categories (many-to-many?)
- One-to-many: Routes have many categories (many-to-many?)

## **Features:**

- Log in/log out
- Create a route
- Edit your route
- Delete your route
- Search a route
- Upvote/downvote routes
- User profile

## **Division of Labor:**

- Angela: Routes Model
- Victor: Users Model
- Candice: Reviews Model
- Daphne: Views - UI/UX, Front-End Design and Development
- Dmytro: Locations Model
- Jennifer: Routes Model

# Requirements

- [] At least 2 complete features in the app (must be approved by TA)
  - A feature is one useful thing you can use the app to do
  - Features can be complementary to each other but they must be differentiable in their implementation (try to demonstrate as much knowledge of Rails as possible!)
- [X] At least 4 models in the app
- [X] At least 2 model relationships in the app
  - [X] At least 1 of those must be a complex relationship (like many-to-many, self-join, polymorphic, etc.)
- [] Must have a database seeds (db/seeds.rb) file
- [] Must submit a writeup in the README.md file
- [X] Must have an equal division of labor (data will be collected through a survey)
- [] Your server must launch with no errors when you run whales server
- [] Must implement at least 15 points worth of ambition features

## **Ambition Features (15 points required)**

- [] Provide a web-hook for others to consume (15 points)
- [?] Use React as a front-end framework served by Rails (15 points)
- [] Utilize ActionCable to have a real-time feature (15 points)
- [] Integration of some non-trivial javascript libraries (10 points)
- [] Interact with an API that provides a service (Stripe, Lob, etc.) (10 points)
- [] Implement a non-trivial gem not talked about in class to enhance your application (10 points)
  - Devise, Faker, rails-admin, and Faraday don&#39;t count!
- [X] Consume data from an external API (5 points)
- [X] Use Devise in your application (5 points)
- [] React to a web-hook of some kind (5 points)
- [X] Host on a website like Heroku (5 points)
- [X] Have some styling to make the app prettier (5 points)
- [] Use Rails Partials to organize your UI (5 points)
- [] Literally do nothing. We&#39;ll flip three coins to see if you get these points (12.5% chance: 5 points)
- [] Literally do nothing. If you&#39;re the only team that specifies this ambition feature in your project writeup, you&#39;ll get the points. (15 points)