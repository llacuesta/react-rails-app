class ChangeForeignKeyToNullable < ActiveRecord::Migration[8.0]
  def change
    change_column_null :employees, :project_id, true
  end
end
