class PostsController < ApplicationController

  def index
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(posts_params)
    if @post.save
      flash[:success] = '投稿しました'
      redirect_to root_path
    else
      flash.now[:denger] = '投稿に失敗しました'
      render :new
    end
  end

  def map
  end

  def search
    current_lat = posts_paramas[:latitude].to_f
    current_lng = posts_paramas[:longitude].to_f
    @posts = Post.where( latitude:(current_lat - 0.009)..(current_lat + 0.009), longitude:(current_lng - 0.009)..(current_lng + 0.009) )
  
    render json: @posts
  end
  
  private
    def posts_paramas
      params.permit(:latitude, :longitude)
    end


end
