import { useEffect, type ComponentType } from 'react'
import { createPortal } from 'react-dom'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { useStore } from 'store'

type ModalHocOptions = {
  id: string;
}

/**
 * HoC для рендера стандартной обертки модалки
 */
export function wrapInModal(options: ModalHocOptions) {
  return function <P extends Record<string, unknown>>(Component: ComponentType<P>) {
    function WrapInModalHoc(props: P) {
      return createPortal(
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>,
        document.body,
      )
    }

    WrapInModalHoc.displayName = `wrap-in-modal(${Component.displayName})`

    return modal(options)(WrapInModalHoc)
  }
}

function modal(options: ModalHocOptions) {
  return function <P extends Record<string, unknown>>(Component: ComponentType<P>) {
    useRegisterModal(options, Component)

    return null
  }
}

const useRegisterModal = (options: ModalHocOptions, _modal: unknown) => {
  const registerModal = useStore(store => store.registerModal)
  const unregisterModal = useStore(store => store.unregisterModal)

  useEffect(() => {
    registerModal(options.id)

    return () => {
      unregisterModal(options.id)
    }
  }, [options.id])
}
