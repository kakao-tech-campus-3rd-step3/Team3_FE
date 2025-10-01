export interface Venue {
  venueId: number; // PK 필수
  venueName: string;
  address: string;
  contactInfo: string;
  facilities: string;
  pricePerHour: number;
}
