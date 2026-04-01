import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "proj_1",
    title: "Cliffside Villa Shoot",
    slug: "cliffside-villa",
    location: "Howth, Dublin",
    shootDate: "2026-04-05",
    description: "Luxury villa drone shoot for real estate marketing",
    status: "editing",
    featured: true,
    isPublic: true,
    archived: false,
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-04-01T12:00:00Z",
    shots: [
      {
        id: "shot_1",
        title: "Opening orbit",
        type: "orbit",
        completed: true,
        order: 1,
      },
      {
        id: "shot_2",
        title: "Reveal from trees",
        type: "reveal",
        completed: false,
        order: 2,
      },
    ],
    media: [
      {
        id: "media_1",
        type: "image",
        url: "/sample1.jpg",
        caption: "Front view",
        isBestShot: true,
      },
      {
        id: "media_2",
        type: "video",
        url: "/sample-video.mp4",
        isBestShot: false,
      },
    ],
  },

  {
    id: "proj_2",
    title: "City Apartment Promo",
    slug: "city-apartment",
    location: "Dublin City Center",
    status: "planned",
    featured: false,
    isPublic: false,
    archived: false,
    createdAt: "2026-04-02T09:00:00Z",
    updatedAt: "2026-04-02T09:00:00Z",
    shots: [],
    media: [],
  },
];
