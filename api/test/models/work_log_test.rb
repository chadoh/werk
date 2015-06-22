require 'test_helper'

class WorkLogTest < ActiveSupport::TestCase
  test "#total_time is a BigDecimal" do
    work_log = work_logs(:one)
    assert_equal BigDecimal, work_log.total_time.class
  end

  test "#total_time gets serialized as a string" do
    work_log = work_logs(:one)
    json = JSON.parse work_log.to_json
    assert_equal work_log.total_time.to_s, json['total_time']
  end
end
