class Company < ApplicationRecord
  has_many :employees
  has_many :projects

  # validation
  validates :company_name, presence: true
end
