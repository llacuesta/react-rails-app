# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'

# create companies
Company.destroy_all # remove contents for dev only
Company.create([
  {
    company_name: "Aperture Science"
  }
])
p "Created 1 company"

Project.destroy_all
Project.create([
  {
    project_name: "Portal Gun Device",
    duration: rand(24..72),
    start_date: Date.today,
    company_id: 1
  },
  {
    project_name: "Aerial Faith Plate",
    duration: rand(24..72),
    start_date: Date.today,
    company_id: 1
  }
])
p "Created 2 projects"

# remove this later once frontend is supported
Employee.destroy_all
(10).times do |i|
  Employee.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    company_id: 1,
    project_id: 1
  )
end
p "Created 10 employees"
