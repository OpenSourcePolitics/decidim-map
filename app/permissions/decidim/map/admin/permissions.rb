# frozen_string_literal: true

module Decidim
  module Map
    module Admin
      class Permissions < Decidim::DefaultPermissions
        def permissions
          return permission_action unless user
          return permission_action unless permission_action.scope == :admin
          permission_action
        end
      end
    end
  end
end
