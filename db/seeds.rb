require "faker"

100.times do |n|
  sample_content = Faker::Lorem.sentence(word_count: 5, supplemental: true, random_words_to_add: 300)
  sample_latitude = Faker::Number.between(from: 20.00, to: 45.00).round(7)
  sample_longitude = Faker::Number.between(from: 120.00, to: 150.00).round(7)
  Post.create!(
    content: sample_content,
    latitude: sample_latitude,
    longitude: sample_longitude
  )
end

10.times do |n|
  sample_content = Faker::Lorem.sentence(word_count: 5, supplemental: true, random_words_to_add: 300)
  sample_latitude = Faker::Number.between(from: 35.0031361-0.009, to: 35.0031361+0.009).round(7)
  sample_longitude = Faker::Number.between(from: 135.7584737-0.009, to: 135.7584737+0.009).round(7)
  Post.create!(
    content: sample_content,
    latitude: sample_latitude,
    longitude: sample_longitude
  )
end
