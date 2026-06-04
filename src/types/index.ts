export type AccountType = 'private' | 'followers_only' | 'public';

export type UserRole = 'traveler' | 'guide';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  accountType: AccountType;
  role: UserRole;
  createdAt: string;
}

export interface Journey {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  isPublic: boolean;
  country?: string;
  city?: string;
  stats: JourneyStats;
  createdAt: string;
}

export interface JourneyStats {
  totalDays: number;
  totalKm: number;
  placesVisited: number;
  memoriesCaptured: number;
}

export interface JourneyDay {
  id: string;
  journeyId: string;
  dayNumber: number;
  date: string;
  title?: string;
  notes?: string;
  photos: Memory[];
  route?: RoutePoint[];
  places: Place[];
  stats: DayStats;
}

export interface DayStats {
  distanceKm: number;
  placesDiscovered: number;
  memoriesCaptured: number;
}

export interface Memory {
  id: string;
  journeyDayId: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  location?: Coordinate;
  takenAt: string;
}

export interface Place {
  id: string;
  name: string;
  category?: string;
  location: Coordinate;
  imageUrl?: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RoutePoint extends Coordinate {
  timestamp: string;
  altitude?: number;
}

export interface TravelGuide {
  id: string;
  userId: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  route: RoutePoint[];
  places: Place[];
  duration?: string;
  difficulty?: 'easy' | 'moderate' | 'hard';
  category: 'historical' | 'nature' | 'food' | 'hidden_gems' | 'walking' | 'road_trip';
  isPublic: boolean;
  createdAt: string;
}
