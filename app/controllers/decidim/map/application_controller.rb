# frozen_string_literal: true

module Decidim
  module Map
    # This controller is the abstract class from which all other controllers of
    # this engine inherit.
    #
    # Note that it inherits from `Decidim::Components::BaseController`, which
    # override its layout and provide all kinds of useful methods.
    class ApplicationController < Decidim::ApplicationController

      include ActionView::Helpers::AssetTagHelper
      include ActionView::Helpers::AssetUrlHelper
      include ActionView::Helpers::JavaScriptHelper
      include ActionView::Helpers::SanitizeHelper
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::TextHelper


      helper Decidim::FiltersHelper
      helper Decidim::OrdersHelper
      helper Decidim::ResourceReferenceHelper
      helper Decidim::TranslationsHelper
      helper Decidim::IconHelper
      helper Decidim::ResourceHelper
      helper Decidim::ScopesHelper
      helper Decidim::AttachmentsHelper
      helper Decidim::SanitizeHelper

      helper Decidim::Map::ApplicationHelper

      helper_method :current_manifest

      def current_manifest
        @current_manifest ||= {
          engine: Decidim::Map::Engine,
          admin_engine: Decidim::Map::AdminEngine,
          icon: "decidim/map/icon.svg",
          permissions_class_name: "Decidim::Map::Permissions"
        }
      end

    end
  end
end
