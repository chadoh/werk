Rails.application.routes.draw do
  namespace :v1, defaults: { format: :json } do
    resources :work_logs, except: [:new, :edit, :show]
  end
end
