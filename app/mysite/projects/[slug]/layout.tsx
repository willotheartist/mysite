// app/mysite/projects/[slug]/layout.tsx
export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Intentionally no Header/Menu here to avoid layout & animation conflicts
  return <>{children}</>;
}
