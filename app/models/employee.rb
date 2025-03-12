class Employee < ApplicationRecord
  belongs_to :company
  # has_and_belongs_to_many :projects

  # validates
  validates :first_name, :last_name, :company_id, presence: true
end
