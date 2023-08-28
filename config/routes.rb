Rails.application.routes.draw do
  root 'posts#index'
  resources :posts, only: [:new, :create]
  get  '/posts/map', to: 'posts#map', as: 'map_posts'
  get 'posts/search', to: 'posts#search', as: 'posts_serach'

   # 例外
  get '*not_found', to: 'application#routing_error'
  post '*not_found', to: 'application#routing_error'

end
