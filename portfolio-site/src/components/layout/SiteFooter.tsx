import { RESUME_DATA } from "@/data/resumeData";

export function SiteFooter() {
  return (
    <footer className="py-10 text-sm text-zinc-400">
      © {new Date().getFullYear()} {RESUME_DATA.name}. Built for Firebase Hosting.
    </footer>
  );
}
