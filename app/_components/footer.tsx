import Link from "next/link";

const footer_links = [
  { title: "Tutorials", href: "/tutorials" },
  { title: "Cheatsheet", href: "/cheatsheet" },
  { title: "Practice", href: "/practice" },
  { title: "Sandbox", href: "/sandbox" },
  { title: "Github", href: "http://github.com/sam4web/python-handbook/" },
];

export default function Footer() {
  return (
    <footer>
      <div className="section-container py-5 md:py-6">
        <div className="flex-between flex-col md:flex-row gap-y-2">
          <ul className="flex space-x-2 md:space-x-3">
            {footer_links.map((link) => (
              <li>
                <Link href={link.href} className="hover:text-primary text-secondary-foreground">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-secondary-foreground">Built with 💙 for Python learners.</p>
        </div>
      </div>
    </footer>
  );
}
