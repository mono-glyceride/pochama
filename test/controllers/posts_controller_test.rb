require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  
  # コントローラーテスト
  test "should get home" do
    get root_path
    assert_response :success
  end  

  test "should get new" do
    get new_post_path
    assert_response :success
  end

  test "should get map" do
    get map_posts_path
    assert_response :success
  end

  test "should get search" do
    get posts_serach_path
    assert_response :success
  end

end
