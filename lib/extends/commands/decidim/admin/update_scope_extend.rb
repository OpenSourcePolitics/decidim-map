# frozen_string_literal: true

module Decidim
  module Map
    module UpdateScopeExtends

      def attributes
        {
          name: form.name,
          code: form.code,
          scope_type: form.scope_type,
          geo_data: form.geo_data
        }
      end

    end
  end
end


Decidim::Admin::UpdateScope.class_eval do
  prepend(Decidim::Map::UpdateScopeExtends)
end
