class AddNotesToWorkLogs < ActiveRecord::Migration
  def change
    add_column :work_logs, :notes, :text
  end
end
