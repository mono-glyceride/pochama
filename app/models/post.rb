class Post < ApplicationRecord
  validates :content, length: { maximum: 200 }
  validates :latitude, numericality: { in: 0..90 }
  validates :longitude, numericality: { in: 0..360 }
end
