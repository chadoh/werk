class AddPreferredHoursToUsers < ActiveRecord::Migration
  def change
    add_column :users, :preferred_hours_per_day, :decimal, default: 5, null: false
  end
end
