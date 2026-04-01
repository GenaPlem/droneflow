export type ProjectStatus =
  | "planned"
  | "ready_to_shoot"
  | "filmed"
  | "editing"
  | "delivered";

export type ShotType = "orbit" | "reveal" | "top_down" | "tracking" | "custom";

export type MediaType = "image" | "video";

export type Shot = {
  id: string;
  title: string;
  type: ShotType;
  notes?: string;
  completed: boolean;
  order: number;
};

export type Media = {
  id: string;
  type: MediaType;
  url: string;
  caption?: string;
  isBestShot: boolean;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  shootDate?: string;
  description?: string;
  status: ProjectStatus;
  featured: boolean;
  isPublic: boolean;
  archived: boolean;
  shots: Shot[];
  media: Media[];
  createdAt: string;
  updatedAt: string;
};
