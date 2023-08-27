class Post < ApplicationRecord
  has_one_attached :image

  validates :content, presence: true, length: { maximum: 200 }
  validates :latitude, numericality: { in: 0..90 }
  validates :longitude, numericality: { in: 0..360 }
end
