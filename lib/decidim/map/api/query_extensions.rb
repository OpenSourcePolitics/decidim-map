# frozen_string_literal: true

module Decidim
  module Map
    module Api
      # This module's job is to extend the API with custom fields related to
      # decidim-comments.
      module QueryExtensions
        # Public: Extends a type with `decidim-map`'s fields.
        #
        # type - A GraphQL::BaseType to extend.
        #
        # Returns nothing.
        def self.define(type)
          type.field :map, Decidim::Map::MapType, "The map element" do
            resolve ->(_obj, _args, ctx) { ctx[:current_organization] }
          end
        end
      end
    end
  end
end
