class Document < ApplicationRecord
	validates :title, presence: true,
					  length: {minimum: 3, maximum: 30},
					  uniqueness: true
	validates :content, presence: true
  	belongs_to :category

  	scope :getDocumentReferences, -> { where.not(category_id: 3) }
  	scope :getRecordReferences, -> { where(category_id: 3) }
end
