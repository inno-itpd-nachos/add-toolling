import { Excalidraw } from '@excalidraw/excalidraw'
import './App.css'

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Diagram</h1>
      <div style={{ height: "500px" }}>
        <Excalidraw />
      </div>
    </>
  )
}

export default App
