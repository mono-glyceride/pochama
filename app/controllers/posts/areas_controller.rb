class Posts::AreasController < ApplicationController

  def index
  end

  private
    def posts_params
      params.require(:post).permit(:latitude, :longitude)
    end
end


