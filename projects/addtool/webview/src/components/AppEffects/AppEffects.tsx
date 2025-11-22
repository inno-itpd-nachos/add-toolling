import { type FC } from "react"
import { useMessageListener, useUmlComponentWatcher } from "./hooks"

export const AppEffects: FC = () => {
  // useThemeWatcher()
  useMessageListener()
  useUmlComponentWatcher()

  return null
}
