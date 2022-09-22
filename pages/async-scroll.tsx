import { nanoid } from '@reduxjs/toolkit'
import cx from 'classnames'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

type Message = {
  id: string
  title: string
  description: string
}

const description =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem beatae consequatur cum distinctio enim facere ipsa iure nesciunt nobis perferendis sequi sit temporibus vel, voluptates! Accusantium ducimus explicabo nesciunt.'

const random = (max: number) => Math.floor(Math.random() * max)

function paginate<T>(array: T[], count: number) {
  const pages = Math.round(array.length / count)

  return Array.from({ length: pages }, (_item, index) => ({
    index,
    id: nanoid(),
    items: array.slice(count * index, count * index + count),
  }))
}

function getMock(): Message[] {
  return Array.from({ length: 10000 }, (_item, index) => ({
    id: nanoid(),
    title: `Текст ${random(index)}`.repeat(random(4)),
    description: description.repeat(random(17)),
  }))
}

const threads = Array.from({ length: 7 }, (_item, index) => ({
  id: nanoid(),
  title: `Чат № ${index}`,
  messages: paginate(getMock(), 20),
}))

async function getFakeHistory({
  threadId,
  details,
}: {
  threadId: string
  details?: {
    type: 'BEFORE' | 'AFTER'
    id: string
  }
}) {
  await new Promise((resolve) => setTimeout(resolve, 230))

  const thread = threads.find((item) => item.id === threadId)

  if (!thread) return Promise.reject('Такого диалога не существует')

  const { messages } = thread

  const size = messages.length

  if (!details) {
    return messages[size - 1]
  }

  const { type, id } = details
  const currentIndex = messages.findIndex((item) => item.id === id)
  const index = type === 'BEFORE' ? currentIndex - 1 : currentIndex + 1

  if (index === -1) return Promise.reject('Такой записи не существует!')
  if (index >= size)
    return Promise.reject('Текущий список сообщений последний!')

  return messages[index]
}

function Viewport() {}

function ChatViewport() {
  function onScroll({ currentTarget }: React.UIEvent<HTMLDivElement>) {
    if (currentTarget.scrollTop === 0) {
    }
  }

  return <div onScroll={onScroll}></div>
}

const defaultList: Message[] = []

const AsyncScroll: NextPage = () => {
  const [savedMessages, setSavedMessages] = useState<string[]>([])
  const [threadId, setThreadId] = useState<string | null>(null)
  const [threadMessages, setThreadMessages] = useState<{
    [key: string]: Message[]
  } | null>(null)
  const messages = threadId
    ? threadMessages?.[threadId] || defaultList
    : defaultList

  function onChangeThread({
    currentTarget: { value },
  }: React.MouseEvent<HTMLButtonElement>) {
    setThreadId(value)
  }

  async function getMessages() {
    return []
  }

  useEffect(() => {
    getMessages().then().catch()

    setThreadMessages(getMessages())
  }, [threadId])

  return (
    <div className="grid grid-cols-[300px,1fr] w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        {threads.map((thread) => (
          <div key={thread.id}>
            <p
              className={cx({
                'font-bold': thread.id === threadId,
              })}
            >
              {thread.title}
            </p>
            <button
              disabled={thread.id === threadId}
              className="btn"
              value={thread.id}
              onClick={onChangeThread}
            >
              Перейти
            </button>
          </div>
        ))}
      </div>
      <div className="h-full overflow-hidden">
        {messages.length ? (
          <div className="overflow-y-auto h-full">
            {messages.map((item) => (
              <div key={item.id}>
                <h1 className="text-xl">{item.title}</h1>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1>Нет ни одного чата</h1>
        )}
      </div>
    </div>
  )
}

export default AsyncScroll
