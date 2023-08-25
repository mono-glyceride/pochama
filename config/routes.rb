Rails.application.routes.draw do
  root 'posts#index'
  resources :posts, only: [:new, :create]
  get  '/posts/map', to: 'posts#map', as: 'map_posts'
  namespace :posts do
    resources :areas, only: :index, default: { fortmat: :json }
  end
end
