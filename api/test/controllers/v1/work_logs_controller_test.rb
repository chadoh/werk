require 'test_helper'

module V1
  class WorkLogsControllerTest < ActionController::TestCase
    def setup
      @controller = WorkLogsController.new
    end

    test "#index doesn't render if not signed in" do
      get :index
      assert_response :unauthorized
      assert_nil assigns(:work_logs)
    end

    def encode_credentials(username, password)
      "Basic #{ActiveSupport::Base64.encode64("#{username}:#{password}")}"
    end
    test "#index successfully returns json-ized work_logs for the authenticated user" do
      sign_in_basic users(:one)
      get :index
      assert_response :success
      assert_not_nil assigns(:work_logs)
      assert_equal 1, assigns(:work_logs).length
      assert_equal Mime::JSON, response.content_type
      json = JSON.parse response.body
      assert_equal assigns(:work_logs).first.id, json[0]['id']
    end

    test "#create returns json of newly created work_log" do
      sign_in_basic users(:one)
      assert_difference("WorkLog.count", 1) do
        post :create, work_log: { work_date: Time.now, total_time: 1.11 }
      end

      assert_response :success
      assert_not_nil assigns(:work_log)
      assert_equal users(:one), assigns(:work_log).user
      assert_equal Mime::JSON, response.content_type

      json = JSON.parse response.body
      assert_not_nil json['work_date']
      assert_not_nil json['total_time']
    end

    test "#update returns json of updated work_log" do
      sign_in_basic users(:one)
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

    test "#update doesn't allow updating someone else's logs" do
      sign_in_basic users(:one)
      work_log = work_logs(:two)

      old_date = work_log.work_date

      patch :update, id: work_log.id, work_log: { work_date: Date.tomorrow, total_time: 1.11 }

      assert_response :not_found
      assert_equal work_log.reload.work_date, old_date
    end

    test "#destroy returns 202 accepted" do
      sign_in_basic users(:one)
      work_log = work_logs(:one)
      assert_difference('WorkLog.count', -1) do
        delete :destroy, id: work_log.id
      end

      assert_response :accepted
      assert_equal "", response.body
    end

    test "#destroy doesn't allow updating someone else's logs" do
      sign_in_basic users(:one)
      work_log = work_logs(:two)
      assert_difference('WorkLog.count', 0) do
        delete :destroy, id: work_log.id
      end

      assert_response :not_found
    end
  end
end
