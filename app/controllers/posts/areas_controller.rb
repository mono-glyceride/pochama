class Posts::AreasController < ApplicationController

  def index
    current_lat = posts_params[:latitude]
    current_lng = posts_params[:longtitude]
    @posts = Posts.where( latitude:current_lat-0.009..current_lat+0.009, longitude:current_lng-0.009..current_lng+0.009 )

    respond_to do |fortmat|
      fortmat.html {redirect_to :root}
      fortmat.json {render json: @posts }
    end
  end

  private
    def posts_paramas
      params.require(:post).permit(:latitude, :longitude)
    end
end


