# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_09_213401) do

  create_table "categories", force: :cascade do |t|
    t.string "name", limit: 30
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "documents", force: :cascade do |t|
    t.string "title", limit: 30
    t.text "content"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_documents_on_category_id"
    t.index ["title"], name: "index_documents_on_title", unique: true
  end

  create_table "responsibles", force: :cascade do |t|
    t.string "name", limit: 30
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
