module V1

  class UsersController < ApplicationController
    def index
      @users = User.all
      render json: @users, each_serializer: UserSerializer
    end

    def create
      @user = User.new user_params
      if @user.save
        render json: @user, serializer: UserSerializer
      else
        render json: { error: @user.errors.full_messages.join('; ')}, status: :unprocessable_entity
      end
    end

    def update
      @user = User.find params[:id]
      if @user.update user_params
        render json: @user, serializer: UserSerializer
      else
        render json: { error: @user.errors.full_messages.join('; ')}, status: :unprocessable_entity
      end
    end

    def destroy
      @user = User.find params[:id]
      @user.destroy
      head :accepted
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end
