class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.string :title, limit: 30
      t.text :content
      t.references :category, foreign_key: true

      t.timestamps
    end
    add_index :documents, :title, unique: true
  end
end
