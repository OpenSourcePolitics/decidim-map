/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetMapQuery {
  // The map element
  map:  {
    // Lists proposals.
    proposals:  Array< {
      id: string,
      // This proposal's title
      title: string,
      address: string,
      body: string,
      // Physical coordinates for this meeting
      coordinates:  {
        // Latitude of this coordinate
        latitude: number,
        // Longitude of this coordinate
        longitude: number,
      } | null,
    } | null > | null,
    // Lists meetings.
    meetings:  Array< {
      id: string,
      // The title of this meeting.
      title:  {
        // Returns a single translation given a locale.
        translation: string | null,
      },
      // Physical coordinates for this meeting
      coordinates:  {
        // Latitude of this coordinate
        latitude: number,
        // Longitude of this coordinate
        longitude: number,
      } | null,
    } | null > | null,
  } | null,
};
