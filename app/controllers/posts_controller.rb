class PostsController < ApplicationController

  def index
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(posts_paramas)
    if @post.save
      flash[:success] = '投稿しました'
      redirect_to posts_path
    else
      flash.now[:denger] = '投稿に失敗しました'
      render :new
    end
  end

  private
    def posts_paramas

      params.require(:post).permit(:content, :latitude, :longitude)
    end


end
