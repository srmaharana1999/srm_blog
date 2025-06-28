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
    <li className={` ${active ? "text-red-500" : "text-white"}`}>
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavLink;
