export interface TicketmasterImage {
    ratio?: string;
    url: string;
    width: number;
    height: number;
  }
  
  export interface TicketmasterClassification {
    segment?: { id: string; name: string };
    genre?:   { id: string; name: string };
  }
  
  export interface TicketmasterVenue {
    name: string;
    city?: { name: string };
    country?: { name: string; countryCode: string };
    location?: { latitude: string; longitude: string };
  }
  
  export interface TicketmasterPriceRange {
    type: string;
    currency: string;
    min: number;
    max: number;
  }
  
  export interface TicketmasterEvent {
    id: string;
    name: string;
    url: string;
    images: TicketmasterImage[];
    dates: {
      start: {
        localDate: string;
        localTime?: string;
        dateTime?: string;
      };
      status?: { code: string };
    };
    classifications?: TicketmasterClassification[];
    priceRanges?: TicketmasterPriceRange[];
    _embedded?: {
      venues?: TicketmasterVenue[];
    };
  }
  
  export interface TicketmasterResponse {
    _embedded?: {
      events?: TicketmasterEvent[];
    };
    page?: {
      totalElements: number;
      totalPages: number;
      number: number;
      size: number;
    };
  }
  
  export type EventGenre    = "Music" | "Sports" | "Arts" | "Theatre" | "Family" | "Comedy" | "All";
  export type EventDateRange = "weekend" | "month" | "3months" | "any";