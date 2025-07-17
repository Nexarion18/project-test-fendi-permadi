"use client";
import { FloatingNav } from "./ui/floating-navbar";
export function Header() {
    const navItems = [
        {
            name: "Work",
            link: "/work",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Services",
            link: "/contact",
        },
        {
            name: "Ideas",
            link: "/Ideas",
        },
        {
            name: "Careers",
            link: "/Careers",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];
    return (
        <>
            <FloatingNav navItems={navItems}  />
        </>
    );
}
export default Header;