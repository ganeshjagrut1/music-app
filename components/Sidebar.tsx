"use client";

import { Song } from "@/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import usePlayer from "@/hooks/usePlayer";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { twMerge } from "tailwind-merge";
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}


const Sidebar: React.FC<SidebarProps> = ({
    children, songs
}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            herf: '/'
        }, {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            herf: '/search'

        }
    ], [pathname]);
    return (
        <>
            <div className={twMerge(`flex h-full`,player.activeId && 'h-[calc(100%-80px)]')}>
                <div className="hidden md:flex flex-col gap-y-2  bg-black h-full w-[300px] p-2">
                    <Box>
                        <div className="flex flex-col gap-y-4 px-5 py-4">
                            {routes.map((item) =>
                            (
                                <SidebarItem href={item.herf} key={`${item.label}`} {...item} />
                            ))}
                        </div>
                    </Box>
                    <Box>
                        <Library songs={songs} />
                    </Box>
                </div>
                <main className="h-full flex-1 overflow-y-auto py-2">
                    {children}
                </main>
            </div>
        </>
    );
}

export default Sidebar;