class RemoveCompanyRefFromEmployee < ActiveRecord::Migration[8.0]
  def change
    remove_reference :employees, :company, null: false, foreign_key: true
  end
end
