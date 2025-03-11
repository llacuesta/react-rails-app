Rails.application.routes.draw do
  scope "/api" do
    get "up" => "rails/health#show", as: :rails_health_check

    resources :employees, only: %i[index create update destroy]
    resources :projects, only: %i[index show create update destroy]
    resources :companies, only: %i[index show create update destroy]
  end
end
