import React from 'react'
import ReactDOM from 'react-dom'

export default function Modal({
  open,
  onClose,
  title,
  children,
}: React.PropsWithChildren<ModalProps>) {
  const [nextRoot, setNextRoot] = React.useState<Element | null>(null)

  React.useEffect(() => {
    setNextRoot(document.querySelector('#__next'))
  }, [])

  if (!nextRoot) {
    return null
  }

  return ReactDOM.createPortal(
    open ? (
      <div className="modal modal-open" id="my-modal-2">
        <div className="modal-box max-w-[1170px]">
          <h3 className="font-bold text-lg">{title}</h3>
          <div>{children}</div>
          <div className="modal-action">
            <button onClick={onClose}>Закрыть</button>
          </div>
        </div>
      </div>
    ) : null,
    nextRoot
  )
}

export type ModalProps = {
  title: string
  open: boolean
  onClose(): void
}
