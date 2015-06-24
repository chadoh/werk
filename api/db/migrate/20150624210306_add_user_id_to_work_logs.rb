class AddUserIdToWorkLogs < ActiveRecord::Migration
  def change
    add_reference :work_logs, :user, index: true, foreign_key: true
  end
end
