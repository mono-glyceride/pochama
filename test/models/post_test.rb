require "test_helper"

class PostTest < ActiveSupport::TestCase
  
  def setup
    @post = Post.new(content:"test", latitude:23.4, longitude:56.7)
  end

  # emoji列追加後
  #def setup
  #  @post = Post.new(content:"test", latitude:23.4, longitude:56.7, emoji:"👌")
  #end

  test "should be valid" do
    assert @post.valid?
  end

  test "content should be present" do
    @post.content = "   "
    assert_not @post.valid?
  end

  test "content should not be too long" do
    @post.content = "a" * 201
    assert_not @post.valid?
  end

  test "latitude should not be too big" do
    @post.latitude = 91
    assert_not @post.valid?
  end

  test "latitude should not be too small" do
    @post.latitude = -1
    assert_not @post.valid?
  end

  test "longitude should not be too big" do
    @post.longitude = 361
    assert_not @post.valid?
  end

  test "longitude should not be too small" do
    @post.longitude = -1
    assert_not @post.valid?
  end

  #test "emoji should be present" do
  #  @post.emoji = ""
  #  assert_not @post.valid?
  #end

  #test "emoji should be emoji" do
  #  @post.emoji = "a"
  #  assert_not @post.valid?
  #end

  #test "emoji should not be too long" do
  #  @post.emoji = "👌👌👌"
  #  assert_not @post.valid?
  #end

end
