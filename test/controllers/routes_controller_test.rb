require 'test_helper'

class RoutesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get routes_create_url
    assert_response :success
  end

  test "should get edit" do
    get routes_edit_url
    assert_response :success
  end

  test "should get bookmark" do
    get routes_bookmark_url
    assert_response :success
  end

end
