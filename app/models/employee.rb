class Employee < ApplicationRecord
  belongs_to :company
  belongs_to :project, optional: true

  # validates
  validates :first_name, :last_name, :company_id, presence: true
end
