import React from 'react';
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";

const Navbar = () => {
    const links = [
        {label: 'Dashboard', url: '/'},
        {label: 'Issues', url: '/issues'},
    ];

    return (
        <nav className='flex justify-between items-center space-x-6 h-20 border-b shadow mb-5 px-10'>
            <Link href={'/'}><AiFillBug size={20}/></Link>
            <ul className='flex gap-10'>
                {links.map((link) => (
                    <li key={link.url} className='text-zinc-500 hover:text-zinc-800 transition-colors duration-150'>
                        <Link href={link.url}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;