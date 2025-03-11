class CreateProjects < ActiveRecord::Migration[8.0]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.integer :duration
      t.date :start_date

      t.timestamps
    end
  end
end
