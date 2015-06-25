require 'test_helper'

module V1
  class UsersControllerTest < ActionController::TestCase
    def setup
      @controller = V1::UsersController.new
    end

    test "#index 401s if no auth" do
      get :index
      assert_response :unauthorized
    end

    test "#index 401s if authed but not admin" do
      sign_in_basic users(:one)
      get :index
      assert_response :unauthorized
    end

    test "#index lists all users if authed admin" do
      sign_in_basic users(:admin)
      get :index
      assert_response :success
      assert_equal Mime::JSON, response.content_type
      assert_not_nil assigns(:users)
    end

    test "#create doesn't require auth" do
      assert_difference('User.count', 1) do
        post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles' }
      end
      assert_response :success
      assert_equal Mime::JSON, response.content_type

      json = JSON.parse(response.body)
      assert_equal 'hi@chadoh.com', json['email']
      assert_equal 'bbubbles', json['password']
      assert_equal "5.0", json['preferred_hours_per_day']
      assert_equal false, json['is_admin']
    end

    test "#create 401s if authed as non-admin" do
      sign_in_basic users(:one)
      post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles', is_admin: true }
      assert_response :unauthorized
    end

    test "#create doesn't set is_admin if not authed" do
      assert_difference('User.count', 1) do
        post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles', is_admin: true }
      end

      json = JSON.parse(response.body)
      assert_equal false, json['is_admin']
    end

    test "#create sets is_admin when an admin is authed" do
      sign_in_basic users(:admin)
      assert_difference('User.count', 1) do
        post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles', is_admin: true }
      end

      json = JSON.parse(response.body)
      assert_equal true, json['is_admin']
    end

    test "#update 401s if not authed" do
      patch :update, id: users(:one).id, user: { email: 'amillion@example.com' }
      assert_response :unauthorized
    end

    test "#update 401s if a non-admin tries to update someone else" do
      sign_in_basic users(:one)
      patch :update, id: users(:two).id, user: { email: 'amillion@example.com' }
      assert_response :unauthorized
    end

    test "#update allows updating self" do
      user = users(:one)
      sign_in_basic user
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
      assert_not_nil json['is_admin']
    end

    test "#update allows admin to update others" do
      admin = users(:admin)
      sign_in_basic admin

      user = users(:one)
      old_email = user.email

      patch :update, id: user.id, user: { email: 'amillion@example.com' }

      assert_response :success

      user.reload
      refute_equal old_email, user.email
    end

    test "#destroy 401s if not authed" do
      delete :destroy, id: users(:one).id
      assert_response :unauthorized
    end

    test "#destroy allows destroying self" do
      user = users(:one)
      sign_in_basic user
      assert_difference('User.count', -1) do
        delete :destroy, id: user.id
      end

      assert_response :accepted
      assert_equal "", response.body
    end

    test "#destroy forbids a nonadmin updating someone else" do
      sign_in_basic users(:one)
      delete :destroy, id: users(:two).id
      assert_response :unauthorized
    end

    test "#destroy allows admin to delete others" do
      sign_in_basic users(:admin)
      assert_difference('User.count', -1) do
        delete :destroy, id: users(:two).id
      end
      assert_response :accepted
    end

    test "#signin returns 401 if auth fails" do
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
      assert_equal user.preferred_hours_per_day.to_s, json['preferred_hours_per_day']
    end
  end
end
