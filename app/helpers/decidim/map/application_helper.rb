# frozen_string_literal: true

module Decidim
  module Map
    # Custom helpers, scoped to the map engine.
    #
    module ApplicationHelper

      # Private: Render Comments component using inline javascript
      #
      # node_id - The id of the DOMElement to render the React component
      # props   - A hash corresponding to Comments component props
      def react_map_component(node_id, classes)
        content_tag("div", "", id: node_id, class: classes) +
          javascript_include_tag("decidim/map/map") +
          stylesheet_link_tag("decidim/map/map") +
          javascript_tag(%{
            window.DecidimMap.renderMapComponent(
              '#{node_id}',
              {
                locale: "#{I18n.locale}"
              }
            );
          })
      end

    end
  end
end
