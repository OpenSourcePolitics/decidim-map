# frozen_string_literal: true

require "rails"
require "active_support/all"
require "decidim/core"

require "decidim/map/api/query_extensions"
require "decidim/map/api/proposal_extensions"

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

      initializer "decidim_map.query_extensions" do
        Decidim::Api::QueryType.define do
          Api::QueryExtensions.define(self)
        end
        Decidim::Proposals::ProposalType.define do
          Api::ProposalExtensions.define(self)
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
