class AddImageToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :img_file_name, :string
  end
end
