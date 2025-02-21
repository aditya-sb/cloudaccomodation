// src/types/index.ts
export interface Overview {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  kitchen: string;
  yearOfConstruction: number;
}

export interface Property {
  id: any;
  _id: number; // Assuming this remains a number; if it's an ObjectId in MongoDB, update it accordingly.
  title: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  amenities?: string[]; // Optional array of amenities
  overview: Overview; // Embedded document
  rentDetails: string;
  termsOfStay: string;
  location: string;
  images?: string[] | undefined; // Optional array of image URLs
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
