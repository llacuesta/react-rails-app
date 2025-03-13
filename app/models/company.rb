class Company < ApplicationRecord
  has_many :employees, dependent: :nullify
  has_many :projects, dependent: :nullify

  # validation
  validates :company_name, presence: true
end
