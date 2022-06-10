import React from 'react'

export function useRange({
  dotRef,
  containerRef,
  onChange,
  onChanged,
}: RangeOptions) {
  const [position, setPosition] = React.useState<null | Position>(null)
  const isDragging = Boolean(position)

  function handleMouseMove(e: MouseEvent) {
    if (!position) return

    const { x, y } = getRangeCoords(
      e.pageX - position.cLeft - position.left,
      e.pageY - position.cTop - position.top
    )
    const { relativeX, relativeY } = getRelativeCoords(x, y)

    onChange({ x, y, relativeX, relativeY })
  }

  function handleMouseUp() {
    const { dotCoords, containerCoords } = getLimitedCoords()
    const x = dotCoords.left - containerCoords.left
    const y = dotCoords.top - containerCoords.top
    const { relativeX, relativeY } = getRelativeCoords(x, y)

    setPosition(null)
    onChanged?.({ x, y, relativeX, relativeY })
  }

  function getLimitedCoords() {
    const containerCoords = containerRef.current.getBoundingClientRect()
    const dotCoords = dotRef.current.getBoundingClientRect()

    return {
      maxX: containerCoords.width - dotCoords.width,
      maxY: containerCoords.height - dotCoords.height,
      minX: 0,
      minY: 0,
      containerCoords,
      dotCoords,
    }
  }

  function getRangeCoords(x: number, y: number) {
    const { maxX, maxY, minX, minY } = getLimitedCoords()

    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y)),
    }
  }

  function getRelativeCoords(x: number, y: number) {
    const { maxX, maxY } = getLimitedCoords()

    return {
      relativeX: x / maxX,
      relativeY: y / maxY,
    }
  }

  function setCoordsFromRelative({
    relativeX = 0,
    relativeY = 0,
  }: {
    relativeX?: number
    relativeY?: number
  }) {
    const { maxX, maxY } = getLimitedCoords()
    const x = maxX * relativeX
    const y = maxY * relativeY

    onChange({ x, y, relativeX, relativeY })
  }

  const onClick: React.MouseEventHandler<any> = React.useCallback(
    (e) => {
      const { containerCoords, dotCoords } = getLimitedCoords()
      const { x, y } = getRangeCoords(
        e.pageX - containerCoords.left - dotCoords.width / 2,
        e.pageY - containerCoords.top - dotCoords.height / 2
      )
      const { relativeX, relativeY } = getRelativeCoords(x, y)

      onChange({ x, y, relativeX, relativeY })
      onChanged?.({ x, y, relativeX, relativeY })
    },
    [onChange]
  )

  const onMouseDown: React.MouseEventHandler<any> = React.useCallback((e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const containerCoords = containerRef.current.getBoundingClientRect()

    setPosition({
      left: e.clientX - left,
      top: e.clientY - top,
      width,
      height,
      cLeft: containerCoords.left,
      cTop: containerCoords.top,
    })
  }, [])

  React.useEffect(() => {
    position && window.addEventListener('mousemove', handleMouseMove)

    position && window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)

      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [position])

  return {
    onMouseDown,
    onClick,
    setCoordsFromRelative,
    isDragging,
  }
}

type Position = {
  left: number
  top: number
  width: number
  height: number
  cLeft: number
  cTop: number
}

export type RangeOptions = {
  containerRef: React.MutableRefObject<any>
  dotRef: React.MutableRefObject<any>
  onChange(coords: {
    x: number
    y: number
    relativeX: number
    relativeY: number
  }): void
  onChanged?(coords: {
    x: number
    y: number
    relativeX: number
    relativeY: number
  }): void
}
