import { useState, type FC } from 'react'
import { useStore } from 'store'
import styles from './PromptModal.module.css'

interface PromptModalProps {
  modalId: string
  title: string
  placeholder?: string
  defaultValue?: string
  onConfirm: (value: string) => void
}

export const PromptModal: FC<PromptModalProps> = ({
  modalId,
  title,
  placeholder = '',
  defaultValue = '',
  onConfirm,
}) => {
  const isOpen = useStore((state) => state.modals[modalId])
  const closeModal = useStore((state) => state.closeModal)
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onConfirm(value.trim())
      setValue(defaultValue)
      closeModal(modalId)
    }
  }

  const handleCancel = () => {
    setValue(defaultValue)
    closeModal(modalId)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button
            type="button"
            className={styles.close}
            onClick={handleCancel}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              autoFocus
              className={styles.input}
            />
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonCancel}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonConfirm}`}
              disabled={!value.trim()}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

