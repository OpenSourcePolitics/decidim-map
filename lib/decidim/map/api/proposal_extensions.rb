# frozen_string_literal: true

module Decidim
  module Map
    module Api
      module ProposalExtensions
        def self.define(type)
          type.field :coordinates, Decidim::Core::CoordinatesType, "Physical coordinates for this meeting" do
            resolve ->(proposal, _args, _ctx) {
              [proposal.latitude, proposal.longitude]
            }
          end
        end
      end
    end
  end
end
