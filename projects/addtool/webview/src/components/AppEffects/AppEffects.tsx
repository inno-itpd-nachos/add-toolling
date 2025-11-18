import { type FC } from "react"
import { useThemeWatcher, useUmlComponentWatcher } from "./hooks"

export const AppEffects: FC = () => {
  // useThemeWatcher()
  useUmlComponentWatcher()

  return null
}
