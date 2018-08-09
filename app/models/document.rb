class Document < ApplicationRecord
	validates :title, presence: true,
					  length: {minimum: 3, maximum: 30},
					  uniqueness: true
	validates :content, presence: true
  	belongs_to :category
end
