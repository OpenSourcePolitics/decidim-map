# frozen_string_literal: true

module Decidim
  module Map
    MapType = GraphQL::ObjectType.define do
      name "MapType"
      description "The base Map element"

      field :proposals, types[Decidim::Proposals::ProposalType] do
        description "Lists proposals."
        resolve ->(_obj, _args, _ctx) {

          Rails.logger.debug _obj.inspect

          source_components_ids = Decidim::Component.where(
            manifest_name: "proposals"
          ).published.pluck(:id)

          proposals = Decidim::Proposals::Proposal.where(
            decidim_component_id: source_components_ids
          ).where.not(
            latitude: [nil, ""],
            longitude: [nil, ""],
          ).published
        }
      end

      field :meetings, types[Decidim::Meetings::MeetingType] do
        description "Lists meetings."
        resolve ->(_obj, _args, _ctx) {

            source_components_ids = Decidim::Component.where(
              manifest_name: "meetings"
            ).published.pluck(:id)

            meetings = Decidim::Meetings::Meeting.where(
              decidim_component_id: source_components_ids
            ).where.not(
              latitude: [nil, ""],
              longitude: [nil, ""],
            ).visible
        }
      end

    end
  end
end
