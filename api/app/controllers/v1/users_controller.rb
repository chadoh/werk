module V1
  class UsersController < ApplicationController
    before_action :admin_authenticate, only: :index
    before_action :simple_authenticate, only: [:update, :destroy]

    def index
      @users = User.all
      render json: @users, each_serializer: UserSerializer
    end

    def create
      return if optional_authenticate_failed
      @user = User.new user_params
      if current_user
        @user.is_admin = params[:user][:is_admin]
      end
      if @user.save
        render json: hacky_json(user_params[:password])
      else
        render json: { error: @user.errors.full_messages.join('; ')}, status: :unprocessable_entity
      end
    end

    def update
      @user = User.find params[:id]
      if current_user != @user && !current_user.is_admin
        return head :unauthorized
      end
      if @user.update user_params
        render json: @user, serializer: UserSerializer
      else
        render json: { error: @user.errors.full_messages.join('; ')}, status: :unprocessable_entity
      end
    end

    def destroy
      @user = User.find params[:id]
      if current_user != @user && !current_user.is_admin
        return head :unauthorized
      end
      @user.destroy
      head :accepted
    end

    def signin
      @user = User.find_by_email(params[:email])
      if @user && @user.valid_password?(params[:password])
        render json: hacky_json(params[:password])
      else
        render json: { error: "Email or password incorrect" }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :preferred_hours_per_day)
    end

    def simple_authenticate
      authenticate
    end

    def admin_authenticate
      authenticate
      request_http_basic_authentication unless current_user && current_user.is_admin
    end

    # returns nil if auth succeeds, otherwise returns "Access denied."
    def optional_authenticate
      if request.env['HTTP_AUTHORIZATION']
        admin_authenticate
      end
    end
    alias :optional_authenticate_failed :optional_authenticate

    def hacky_json(password)
      {
        id: @user.id,
        email: @user.email,
        password: password,
        preferred_hours_per_day: @user.preferred_hours_per_day,
        is_admin: @user.is_admin
      }
    end
  end
end
