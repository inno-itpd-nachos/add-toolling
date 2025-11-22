import { vscode } from "lib/vscode"
import { useEffect, useEffectEvent } from "react"
import { useStore } from "store"

export function useMessageListener() {
  const currentTab = useStore(store => store.currentTab)
  const setTab = useStore(store => store.setTab)

  const toggleView = useEffectEvent(() => {
    if (currentTab === 'uml_component') {
      setTab('table_add')
    } else {
      setTab('uml_component')
    }
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = async (e: any) => {
      try {
        const message = e.data
        switch (message.type) {
          // case "theme-change": {
          //   setThemeConfig(message.theme)
          //   break
          // }
          // case "language-change": {
          //   setLangCode(message.langCode)
          //   break
          // }
          // case "image-params-change": {
          //   setImageParams(message.imageParams)
          // }
          // todo: pu command and toggleView into constants
          case "command": {
            switch (message.name) {
              case "toggleView": {
                toggleView()
                break
              }
            }
          }
        }
      } catch (e) {
        vscode.postMessage({
          type: "error",
          content: (e as Error).message,
        })
      }
    }
    window.addEventListener("message", listener)

    return () => {
      window.removeEventListener("message", listener)
    } 
  }, [])

}
