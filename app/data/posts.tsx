export interface Post {
  id: number;
  title: string;
  content: string;
  notionPageId: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Introduction to Digital Signal Processing",
    content: "Created: 2024/09/22",
    notionPageId: "5987cc697c874323920215fbaad8cbbd", // pragma: allowlist secret
    tags: ["notes", "speech", "dsp"],
  },
];
