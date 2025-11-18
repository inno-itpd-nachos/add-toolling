import { useEffect } from "react"
import { useStore } from "store"
import { detectVSCodeTheme } from "store/theme"

export function useThemeWatcher() {
  const {setTheme} = useStore(store => ({setTheme: store.setTheme}))
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // setTheme(detectVSCodeTheme())
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
