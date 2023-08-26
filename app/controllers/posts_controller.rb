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
      redirect_to posts_path
    else
      flash.now[:denger] = '投稿に失敗しました'
      render :new
    end
  end

  def search
    current_lat = posts_params[:latitude]
    current_lng = posts_params[:longitude]
    @posts = Posts.where( latitude:current_lat-0.009..current_lat+0.009, longitude:current_lng-0.009..current_lng+0.009 )
    format.json {render json: @posts }
  end

  def map
  end

  private

    def posts_params
      params.require(:post).permit(:content, :latitude, :longitude)
    end


end
