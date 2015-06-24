Rails.application.routes.draw do
  # Notice that if you are skipping storage for all authentication paths, you
  # may want to disable generating routes to Devise's sessions controller by
  # passing skip: :sessions to `devise_for` in your config/routes.rb
  devise_for :users, skip: :sessions

  namespace :v1, defaults: { format: :json } do
    resources :work_logs, except: [:new, :edit, :show]
  end
  root to: "v1/work_logs#index"
end
