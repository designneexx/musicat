import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Menu from '@/components/Menu'
import catImg from '@/public/images/music.png'
import { useAppSelector } from '@/store'

export default function Header({ isSelectedTrack = false }: HeaderProps) {
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const isPlaying = isSelectedTrack && !paused

  return (
    <div className="navbar w-full shadow-lg bg-base-100">
      <div className="grid container grid-cols-[max-content,.5fr] justify-between">
        <div className="flex">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="text-lg font-bold flex items-center grow">
            <div className="block mr-2 w-6 h-6 relative">
              <Image
                src={catImg}
                layout="fill"
                objectFit="contain"
                className={cx({
                  'animate-bounce origin-bottom': isPlaying,
                })}
                alt=""
              />
            </div>
            <Link href="/">
              <span className="cursor-pointer">
                <span className="text-success">Musi</span>
                <span className="text-error">cat</span>
              </span>
            </Link>
          </div>
        </div>
        <Menu isHorizontal className="hidden lg:flex gap-1 ml-auto" />
      </div>
    </div>
  )
}

type HeaderProps = {
  isSelectedTrack?: boolean
}
