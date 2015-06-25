class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Basic::ControllerMethods

  private

  def authenticate
    authenticate_or_request_with_http_basic do |username,password|
      user = User.find_by_email(username)
      if user.valid_password?(password)
        sign_in :user, user
      end
    end
  end
end
