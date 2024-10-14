export interface Post {
  id: number;
  imageUrl?: string;
  title: string;
  content: string;
  tags: string[];
  notionPageId: string;
  slug: string;
}

export const posts: Post[] = [
  {
    id: 1,
    imageUrl: "/img/posts/introduction-to-digital-signal-processing.webp",
    title: "Introduction to Digital Signal Processing",
    content: "Created: 2024/09/22",
    tags: ["notes", "speech", "dsp"],
    notionPageId: "5987cc697c874323920215fbaad8cbbd", // pragma: allowlist secret
    slug: "introduction-to-digital-signal-processing",
  },
];
