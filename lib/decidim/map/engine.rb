# frozen_string_literal: true

require "rails"
require "active_support/all"
require "decidim/core"

module Decidim
  module Map
    # This is the engine that runs on the public interface of map.
    class Engine < ::Rails::Engine
      isolate_namespace Decidim::Map

      routes do
        # Add engine routes here
        # get '/map', to: "map#index"
        root "map#index"
      end

      initializer "decidim_map.mount_routes" do |_app|
        Decidim::Core::Engine.routes do
          mount Decidim::Map::Engine => "/map"
        end
      end

      initializer "decidim_map.menu" do
        Decidim.menu :menu do |menu|
          menu.item "",
                    "/map",
                    icon_name: "map-marker",
                    position: 10,
                    active: :inclusive
        end
      end

      initializer "decidim_map.assets" do |app|
        app.config.assets.precompile += %w[decidim_map_manifest.js decidim_map_manifest.css]
      end
    end
  end
end
