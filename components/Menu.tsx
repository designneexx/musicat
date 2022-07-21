import {
  ChevronDownIcon,
  ChipIcon,
  HeartIcon,
  LightBulbIcon,
  MoonIcon,
  StarIcon,
} from '@heroicons/react/solid'
import cx from 'classnames'
import Link from 'next/link'
import React from 'react'

export default function Menu({ className, isHorizontal }: MenuProps) {
  return (
    <div className={className}>
      <div className="flex-none">
        <ul
          className={cx('menu p-0', {
            'menu-horizontal': isHorizontal,
          })}
        >
          <li>
            <Link href="/albums" className="gap-1">
              Мои плейлисты
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="gap-1">
              <span>
                <HeartIcon className="w-4 h-4 text-error" />
                Избранное
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <ul
          className={cx('menu p-0', {
            'menu-horizontal': isHorizontal,
          })}
        >
          <li tabIndex={0}>
            <a className="gap-1">
              <StarIcon className="w-4 h-4 text-base-content" />
              Тема
              <ChevronDownIcon className="w-4 h-4" />
            </a>
            <ul className="p-2 right-0 bg-base-100 shadow-md z-50">
              <li>
                <button
                  className="gap-1"
                  data-set-theme="dark"
                  data-act-class="text-primary"
                >
                  <MoonIcon className="w-4 h-4" />
                  Темная
                </button>
              </li>
              <li>
                <button
                  className="gap-1"
                  data-set-theme="light"
                  data-act-class="text-primary"
                >
                  <LightBulbIcon className="w-4 h-4" />
                  Светлая
                </button>
              </li>
              <li>
                <button
                  className="gap-1"
                  data-set-theme="cyberpunk"
                  data-act-class="text-primary"
                >
                  <ChipIcon className="w-4 h-4" />
                  Киберпанк
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

type MenuProps = {
  className?: string
  isHorizontal?: boolean
}
