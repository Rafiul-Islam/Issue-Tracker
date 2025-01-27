"use client";

import React from 'react';
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {Box} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const links = [
    {label: <AiFillBug size={20}/>, url: '/'},
    {label: 'Dashboard', url: '/dashboard'},
    {label: 'Issues', url: '/issues/list'},
];

const authLinks = [
    {label: 'Login', url: '/api/auth/signin'},
    {label: 'Logout', url: '/api/auth/signout'},
];

const Navbar = () => {
    const pathname = usePathname();
    const {status} = useSession();

    return (
        <nav className='flex justify-between items-center h-20 border-b shadow mb-5 px-10'>
            <Box>
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
            </Box>
            <Box>
                <ul className='flex gap-10'>
                    {status === 'unauthenticated' &&
                        <li className='text-zinc-500 hover:text-zinc-800 transition-colors duration-150'>
                            <Link href='/api/auth/signin'>Login</Link>
                        </li>
                    }
                    {status === 'authenticated' &&
                        <li className='text-zinc-500 hover:text-zinc-800 transition-colors duration-150'>
                            <Link href='/api/auth/signout'>Logout</Link>
                        </li>
                    }
                </ul>
            </Box>
        </nav>
    );
};

export default Navbar;