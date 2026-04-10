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
  notes: string | null;
  completed: boolean;
  order: number;
  projectId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Media = {
  id: string;
  type: MediaType;
  url: string;
  caption: string | null;
  isBestShot: boolean;
  projectId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  shootDate: Date | string | null;
  description: string | null;
  status: ProjectStatus;
  featured: boolean;
  isPublic: boolean;
  archived: boolean;
  shots: Shot[];
  media: Media[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
