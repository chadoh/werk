require 'test_helper'

module V1
  class UsersControllerTest < ActionController::TestCase
    def setup
      @controller = V1::UsersController.new
    end

    test "create a user" do
      assert_difference('User.count', 1) do
        post :create, user: { email: 'hi@chadoh.com', password: 'bbubbles', password_confirmation: 'bbubbles' }
      end
      assert_response :success
      assert_equal Mime::JSON, response.content_type
    end
  end
end
