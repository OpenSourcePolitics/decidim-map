class AddGeodataToScopes < ActiveRecord::Migration[5.2]
  def change
    add_column :decidim_scopes, :geo_data, :jsonb
  end
end
