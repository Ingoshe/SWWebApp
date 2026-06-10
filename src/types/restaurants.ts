export interface PlacePhoto {
    name: string;           // e.g. "places/ChIJ.../photos/AXCi2Q..."
    widthPx: number;
    heightPx: number;
  }
  
  export interface PlaceOpeningHours {
    openNow: boolean;
    periods?: Array<{
      open:  { day: number; hour: number; minute: number };
      close: { day: number; hour: number; minute: number };
    }>;
    weekdayDescriptions?: string[];
  }
  
  export interface PlaceDisplayName {
    text: string;
    languageCode: string;
  }
  
  export interface PlaceEditorialSummary {
    text: string;
    languageCode: string;
  }
  
  export type PriceLevel =
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";
  
  export interface GooglePlace {
    id: string;
    displayName: PlaceDisplayName;
    rating?: number;
    userRatingCount?: number;
    priceLevel?: PriceLevel;
    currentOpeningHours?: PlaceOpeningHours;
    photos?: PlacePhoto[];
    editorialSummary?: PlaceEditorialSummary;
    primaryTypeDisplayName?: PlaceDisplayName;
    googleMapsUri?: string;
    internationalPhoneNumber?: string;
    // injected client-side from primaryTypeDisplayName
    cuisineType?: string;
  }
  
  export interface GooglePlacesResponse {
    places: GooglePlace[];
  }
  
  export type CuisineFilter =
    | "All"
    | "Asian"
    | "Japanese"
    | "Chinese"
    | "Korean"
    | "Thai"
    | "Indian"
    | "Middle Eastern"
    | "Mediterranean"
    | "Greek"
    | "Italian"
    | "French"
    | "Mexican"
    | "American"
    | "African"
    | "Caribbean"
    | "Fusion"
    | "Vegetarian/Vegan"
    | "Seafood";
  
  export type PriceFilter  = "Any" | "$" | "$$" | "$$$" | "$$$$";
  export type RatingFilter = "any" | "3.5" | "4.0" | "4.5";
  export type SortRestaurants = "relevance" | "rating" | "reviews";
  
  export const PRICE_LEVEL_MAP: Record<PriceLevel, string> = {
    PRICE_LEVEL_FREE:           "Free",
    PRICE_LEVEL_INEXPENSIVE:    "$",
    PRICE_LEVEL_MODERATE:       "$$",
    PRICE_LEVEL_EXPENSIVE:      "$$$",
    PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
  };