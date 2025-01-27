"use client";

import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {Avatar, Box, Button, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
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
    const {data, status} = useSession();
    console.log(data?.user)

    return (
        <nav className='border-b shadow mb-5 px-5 py-3'>
            <Container>
                <Flex height='100%' justify='between' align='center'>
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
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <Avatar
                                                className='border-gray-400 border-2'
                                                role='button'
                                                size="3"
                                                src={data?.user?.image!}
                                                fallback="A"
                                                radius='full'
                                            />
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content variant="soft">
                                            <Flex direction='column' className='p-3'>
                                                <Text>{data?.user?.name}</Text>
                                                <Text size='1'>{data?.user?.email}</Text>
                                            </Flex>
                                            <DropdownMenu.Separator />
                                            <DropdownMenu.Item color='red' role='button'>
                                                <Link href='/api/auth/signout'>Logout</Link>
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </li>
                            }
                        </ul>
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default Navbar;