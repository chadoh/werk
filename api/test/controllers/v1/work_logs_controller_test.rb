require 'test_helper'

module V1
  class WorkLogsControllerTest < ActionController::TestCase
    def setup
      @controller = WorkLogsController.new
    end

    test "#index successfully returns json-ized work_logs" do
      get :index
      assert_response :success
      assert_not_nil assigns(:work_logs)
      assert_equal Mime::JSON, response.content_type
      json = JSON.parse response.body
      assert_equal assigns(:work_logs).first.id, json[0]['id']
    end

    test "#create returns json of newly created work_log" do
      assert_difference("WorkLog.count", 1) do
        post :create, work_log: { work_date: Time.now, total_time: 1.11 }
      end

      assert_response :success
      assert_not_nil assigns(:work_log)
      assert_equal Mime::JSON, response.content_type

      json = JSON.parse response.body
      assert_not_nil json['work_date']
      assert_not_nil json['total_time']
    end

    test "#update returns json of updated work_log" do
      work_log = work_logs(:one)
      old_date = work_log.work_date
      old_total_time = work_log.total_time

      patch :update, id: work_log.id, work_log: { work_date: Date.tomorrow, total_time: 1.11 }

      assert_response :success
      assert_not_nil assigns(:work_log)
      assert_equal Mime::JSON, response.content_type

      work_log.reload
      refute_equal old_date, work_log.work_date
      refute_equal old_total_time, work_log.total_time

      json = JSON.parse response.body
      assert_not_nil json['work_date']
      assert_not_nil json['total_time']
    end

    test "#destroy returns 202 accepted" do
      work_log = work_logs(:one)
      assert_difference('WorkLog.count', -1) do
        delete :destroy, id: work_log.id
      end

      assert_response :accepted
      assert_equal "", response.body
    end
  end
end
