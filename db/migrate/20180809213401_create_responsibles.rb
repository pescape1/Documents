class CreateResponsibles < ActiveRecord::Migration[5.2]
  def change
    create_table :responsibles do |t|
      t.string :name, limit: 30

      t.timestamps
    end
  end
end
