module V1
  class WorkLogsController < ApplicationController
    before_action :authenticate

    def index
      @work_logs = current_user.work_logs.all
      render json: @work_logs, each_serializer: WorkLogSerializer
    end

    def create
      @work_log = current_user.work_logs.new work_log_params
      if @work_log.save
        render json: @work_log, serializer: WorkLogSerializer
      else
        render json: { error: "Couldn't save it :-(" }, status: :unprocessable_entity
      end
    end

    def update
      @work_log = current_user.work_logs.where(id: params[:id]).first
      return head :not_found unless @work_log
      @work_log.update work_log_params
      render json: @work_log, serializer: WorkLogSerializer
    end

    def destroy
      @work_log = current_user.work_logs.where(id: params[:id]).first
      return head :not_found unless @work_log
      @work_log.destroy
      head :accepted
    end

    private

    def work_log_params
      params.require(:work_log).permit(:work_date, :total_time, :notes)
    end

    def authenticate
      authenticate_or_request_with_http_basic do |username,password|
        user = User.find_by_email(username)
        if user.valid_password?(password)
          sign_in :user, user
        end
      end
    end
  end
end
