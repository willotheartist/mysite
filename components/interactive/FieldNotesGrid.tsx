"use client";

import HoverCard, { HoverCardItem } from "./HoverCard";

const items: HoverCardItem[] = [
  {
    title: "Under Neon Rain — night shift diaries",
    kicker: "feature",
    mediaType: "image",
    src: "/field-notes/assets/cover-1.jpg",
  },
  {
    title: "Bridge Echoes — morning crossings",
    kicker: "short",
    mediaType: "video",
    src: "/field-notes/assets/clip-1.mp4",
    poster: "/field-notes/assets/cover-2.jpg",
  },
  {
    title: "Window Seats — faces on line 7",
    kicker: "feature",
    mediaType: "image",
    src: "/field-notes/assets/cover-3.jpg",
  },
  {
    title: "Paper Cups — conversations after 2am",
    kicker: "short",
    mediaType: "video",
    src: "/field-notes/assets/clip-2.mp4",
    poster: "/field-notes/assets/cover-4.jpg",
  },
  {
    title: "Saltwind — the pier in winter",
    kicker: "essay",
    mediaType: "image",
    src: "/field-notes/assets/cover-5.jpg",
  },
  {
    title: "Two Streets Over — the other market",
    kicker: "essay",
    mediaType: "image",
    src: "/field-notes/assets/cover-6.jpg",
  },
];

export default function FieldNotesGrid() {
  return (
    <div className="fn-grid">
      {items.map((it, i) => (
        <HoverCard key={i} item={it} href="#" />
      ))}
    </div>
  );
}
