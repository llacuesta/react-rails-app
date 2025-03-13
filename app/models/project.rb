class Project < ApplicationRecord
  belongs_to :company
  has_many :employees, dependent: :nullify

  # validation
  validates :project_name, :duration, :start_date, :company_id, presence: true
end
