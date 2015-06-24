module V1
  class WorkLogSerializer < ActiveModel::Serializer
    attributes :id, :work_date, :total_time, :notes
  end
end
