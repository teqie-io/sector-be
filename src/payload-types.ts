/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "user".
 */
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  firstName?: string;
  lastName?: string;
  googleId?: string;
  facebookId?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "card".
 */
export interface Card {
  id: string;
  image: string | Media;
  playerName: string;
  type: 'Single cards' | 'Boxes';
  marketType: 'Shop' | 'Marketplace';
  sportType: string;
  year: number;
  price: number;
  leagueTeam:
    | 'Dallas Mavericks'
    | 'Denver Nuggets'
    | 'Golden State Warriors'
    | 'Houston Rockets'
    | 'Los Angeles Clippers'
    | 'Los Angeles Lakers'
    | 'Memphis Grizzlies'
    | 'Minnesota Timberwolves'
    | 'New Orleans Pelicans'
    | 'Oklahoma City Thunder'
    | 'Phoenix Suns'
    | 'Portland Trail Blazers'
    | 'Sacramento Kings'
    | 'San Antonio Spurs'
    | 'Utah Jazz'
    | 'Atlanta Hawks'
    | 'Boston Celtics'
    | 'Brooklyn Nets'
    | 'Charlotte Hornets'
    | 'Chicago Bulls'
    | 'Cleveland Cavaliers'
    | 'Detroit Pistons'
    | 'Indiana Pacers'
    | 'Miami Heat'
    | 'Milwaukee Bucks'
    | 'New York Knicks'
    | 'Orlando Magic'
    | 'Philadelphia 76ers'
    | 'Toronto Raptors'
    | 'Washington Wizards';
  specialFeature: string;
  brand: string;
  overview: {
    [k: string]: unknown;
  }[];
  detail: {
    [k: string]: unknown;
  }[];
  shipping: {
    [k: string]: unknown;
  }[];
  gradeBy: string;
  rating: number;
  seller?: string | User;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  alt?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hot-card".
 */
export interface HotCard {
  id: string;
  hotCard: string | Card;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "live-break".
 */
export interface LiveBreak {
  id: string;
  image: string | Media;
  name: string;
  sportType: string;
  year: number;
  brand: string;
  leagueTeam: {
    image: string | Media;
    team:
      | 'Dallas Mavericks'
      | 'Denver Nuggets'
      | 'Golden State Warriors'
      | 'Houston Rockets'
      | 'Los Angeles Clippers'
      | 'Los Angeles Lakers'
      | 'Memphis Grizzlies'
      | 'Minnesota Timberwolves'
      | 'New Orleans Pelicans'
      | 'Oklahoma City Thunder'
      | 'Phoenix Suns'
      | 'Portland Trail Blazers'
      | 'Sacramento Kings'
      | 'San Antonio Spurs'
      | 'Utah Jazz'
      | 'Atlanta Hawks'
      | 'Boston Celtics'
      | 'Chicago Bulls'
      | 'Brooklyn Nets'
      | 'Charlotte Hornets'
      | 'Cleveland Cavaliers'
      | 'Detroit Pistons'
      | 'Indiana Pacers'
      | 'Miami Heat'
      | 'Milwaukee Bucks'
      | 'New York Knicks'
      | 'Orlando Magic'
      | 'Philadelphia 76ers'
      | 'Toronto Raptors'
      | 'Washington Wizards';
    price: number;
    id?: string;
  }[];
  overview: {
    [k: string]: unknown;
  }[];
  detail: {
    [k: string]: unknown;
  }[];
  shipping: {
    [k: string]: unknown;
  }[];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hot-live-break".
 */
export interface HotLiveBreak {
  id: string;
  hotLiveBreak: string | Card;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "favourite-product".
 */
export interface FavouriteProduct {
  id: string;
  user: string | User;
  card: string | Card;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "bidding".
 */
export interface Bidding {
  id: string;
  card: string | Card;
  user: string | User;
  price: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "checkout".
 */
export interface Checkout {
  id: string;
  transactionId: string;
  totalAmount: number;
  checkoutTime: string;
  type: string;
  paymentMethod: string;
  status?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}
