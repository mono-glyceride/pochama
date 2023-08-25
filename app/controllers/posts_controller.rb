class PostsController < ApplicationController

  def index
  end

  def new
    @post = Post.new
  end

  private
    def posts_paramas
      params.require(:post).permit(:content, :latitude, :longitude)
    end


end
