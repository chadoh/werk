class WorkLogSerializer < ActiveModel::Serializer
  attributes :id, :work_date, :total_time
end
