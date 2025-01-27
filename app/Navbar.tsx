"use client";

import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/app/components";

const links = [
    {label: 'Dashboard', url: '/'},
    {label: 'Issues', url: '/issues/list'},
];

const Navbar = () => {
    return (
        <nav className='border-b shadow mb-5 px-5'>
            <Container>
                <Flex className='h-16' justify='between' align='center'>
                    <Box>
                        <NavLinks/>
                    </Box>
                    <Box>
                        <AuthStatus/>
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

const NavLinks = () => {
    const pathname = usePathname();
    return (
        <ul className='flex gap-10'>
            <li>
                <Link href='/'>
                    <AiFillBug size={20}/>
                </Link>
            </li>
            {links.map((link) => (
                <li key={link.url}
                    className={classNames({
                        'nav-link': true,
                        '!text-zinc-900': pathname === link.url,
                    })}>
                    <Link href={link.url}>{link.label}</Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const {data, status} = useSession();

    if (status === 'loading') return <Skeleton width='4rem'/>;
    if (status === 'unauthenticated') return <Link className='nav-link' href='/api/auth/signin'>Login</Link>
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    className='border-gray-400 border-2'
                    role='button'
                    size="3"
                    src={data!.user!.image!}
                    fallback="?"
                    radius='full'
                    referrerPolicy='no-referrer'
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
                <Flex direction='column' className='p-3'>
                    <Text>{data?.user?.name}</Text>
                    <Text size='1'>{data?.user?.email}</Text>
                </Flex>
                <DropdownMenu.Separator/>
                <DropdownMenu.Item color='red' role='button'>
                    <Link href='/api/auth/signout'>Logout</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default Navbar;