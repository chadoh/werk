class CreateWorkLogs < ActiveRecord::Migration
  def change
    create_table :work_logs do |t|
      t.date :work_date
      t.decimal :total_time

      t.timestamps null: false
    end
  end
end
