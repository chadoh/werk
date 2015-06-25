module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :preferred_hours_per_day, :is_admin
  end
end
