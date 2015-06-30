Rails.application.config.middleware.insert_before 'Rack::Runtime', 'Rack::Cors' do
  allow do
    origins '*'
    resource '*',
             headers: :any,
             methods: [:get, :put, :post, :patch, :delete, :options]
  end
end
