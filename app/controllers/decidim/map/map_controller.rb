# frozen_string_literal: true

module Decidim
  module Map
    class MapController < Decidim::Map::ApplicationController
      layout "layouts/decidim/map", only: :index

      # helper Decidim::FiltersHelper
      # helper Decidim::OrdersHelper
      # helper Decidim::SanitizeHelper
      # helper Decidim::PaginateHelper
      # helper Decidim::IconHelper
      # helper Decidim::WidgetUrlsHelper
      # helper Decidim::ResourceHelper

      def index
        Rails.logger.debug "----- MapController#index -----"
      end

      # def map
      #   Rails.logger.debug "----- MapController#map -----"
      # end

    end
  end
end
