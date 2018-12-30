# frozen_string_literal: true

require "decidim/map/admin"
require "decidim/map/engine"
require "decidim/map/admin_engine"
# require "decidim/map/component"

module Decidim
  # This namespace holds the logic of the `Map` component. This component
  # allows users to create map in a participatory space.
  module Map
    autoload :Geocodable, "decidim/geocodable"
    include ActiveSupport::Configurable
  end
end
