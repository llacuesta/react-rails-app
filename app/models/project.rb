class Project < ApplicationRecord
  belongs_to :company
  has_and_belongs_to_many :employees

  # validation
  validates :project_name, :duration, :start_date, :company_id, presence: true
end
