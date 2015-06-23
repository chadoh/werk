module V1
  class WorkLogsController < ApplicationController
    def index
      @work_logs = WorkLog.all
      render json: @work_logs, each_serializer: WorkLogSerializer
    end

    def create
      @work_log = WorkLog.new work_log_params
      if @work_log.save
        render json: @work_log, serializer: WorkLogSerializer
      else
        render json: { error: "Couldn't save it :-(" }, status: :unprocessable_entity
      end
    end

    def update
      @work_log = WorkLog.find params[:id]
      @work_log.update work_log_params
      render json: @work_log, serializer: WorkLogSerializer
    end

    def destroy
      @work_log = WorkLog.find params[:id]
      @work_log.destroy
      head :accepted
    end

    private

    def work_log_params
      params.require(:work_log).permit(:work_date, :total_time)
    end
  end
end
