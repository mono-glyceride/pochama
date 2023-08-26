Rails.application.routes.draw do
  root 'posts#index'
  resources :posts, only: [:new, :create]
  get  '/posts/map', to: 'posts#map', as: 'map_posts'
  get 'posts/search', to: 'posts#search', as: 'posts_serach'
end
