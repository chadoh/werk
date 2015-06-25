require 'test_helper'

module V1
  class UsersControllerTest < ActionController::TestCase
    def setup
      @controller = V1::UsersController.new
    end

    test "list users" do
      get :index
      assert_response :success
      assert_equal Mime::JSON, response.content_type
      assert_not_nil assigns(:users)
    end

    test "create a user" do
      assert_difference('User.count', 1) do
        post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles' }
      end
      assert_response :success
      assert_equal Mime::JSON, response.content_type

      json = JSON.parse(response.body)
      assert_equal 'hi@chadoh.com', json['email']
      assert_equal 'bbubbles', json['password']
      assert_equal 5, json['preferred_hours_per_day']
    end

    test "updating a user" do
      user = users(:one)
      old_email = user.email

      patch :update, id: user.id, user: { email: 'amillion@example.com' }

      assert_response :success
      assert_not_nil assigns(:user)
      assert_equal Mime::JSON, response.content_type

      user.reload
      refute_equal old_email, user.email

      json = JSON.parse response.body
      assert_not_nil json['email']
      assert_nil json['password']
      assert_not_nil json['preferred_hours_per_day']
    end

    test "#destroy returns 202 accepted" do
      user = users(:one)
      assert_difference('User.count', -1) do
        delete :destroy, id: user.id
      end

      assert_response :accepted
      assert_equal "", response.body
    end

    test "#sign_in returns 401 if auth fails" do
      post :signin, email: 'whatever', password: 'nope'
      assert_response :unauthorized
    end

    test "#sign_in returns user json if auth succeeds" do
      user = users(:one)
      post :signin, email: user.email, password: 'password'
      assert_response :success
      json = JSON.parse(response.body)
      assert_equal user.email, json['email']
      assert_equal 'password', json['password']
      assert_equal user.preferred_hours_per_day, json['preferred_hours_per_day']
    end
  end
end
