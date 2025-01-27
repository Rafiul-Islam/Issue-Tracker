"use client";

import React from 'react';
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";

const links = [
    {label: 'Dashboard', url: '/'},
    {label: 'Issues', url: '/issues/list'},
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className='flex justify-between items-center space-x-6 h-20 border-b shadow mb-5 px-10'>
            <Link href={'/'}><AiFillBug size={20}/></Link>
            <ul className='flex gap-10'>
                {links.map((link) => (
                    <li key={link.url}
                        className={classNames({
                            'text-zinc-900': pathname === link.url,
                            'text-zinc-500': true,
                            'hover:text-zinc-800 transition-colors duration-150': true,
                        })}>
                        <Link href={link.url}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;