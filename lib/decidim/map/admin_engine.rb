# frozen_string_literal: true

module Decidim
  module Map
    # This is the engine that runs on the public interface of `Map`.
    class AdminEngine < ::Rails::Engine
      isolate_namespace Decidim::Map::Admin

      paths["db/migrate"] = nil
      paths["lib/tasks"] = nil

      routes do
        # Add admin engine routes here
        # resources :map do
        #   collection do
        #     resources :exports, only: [:create]
        #   end
        # end
        # root to: "map#index"
      end

      initializer "decidim_admin.assets" do |app|
        app.config.assets.precompile += %w(
          admin/decidim_map_manifest.js
          admin/decidim_map_manifest.css
        )
      end

      def load_seed
        nil
      end
    end
  end
end
