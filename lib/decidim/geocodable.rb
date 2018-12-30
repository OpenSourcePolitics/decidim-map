# frozen_string_literal: true

require "active_support/concern"

module Decidim
  # A concern with the components needed when you want a model to be able to create
  # links from it to another resource.
  module Geocodable
    extend ActiveSupport::Concern

    included do
      # geocoded_by :geo_query
    end
  end
end
