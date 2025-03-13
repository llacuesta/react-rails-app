class AddProjectRefToEmployees < ActiveRecord::Migration[8.0]
  def change
    add_reference :employees, :project, null: false, foreign_key: true
  end
end
