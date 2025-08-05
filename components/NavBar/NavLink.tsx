"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface INavLinkProps {
  label: string;
  href: string;
}
const NavLink = ({ label, href }: INavLinkProps) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li
      className={`inline-flex items-center gap-1 hover:scale-105 transition-all duration-150 ease-in-out ${
        active ? "nav-logo" : "text-black"
      }`}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavLink;
