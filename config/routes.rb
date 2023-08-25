Rails.application.routes.draw do
  root 'posts#index'
  resources :posts
  namespace :posts do
    resources :areas, only: :index, default: { fortmat: :json }
  end
end
