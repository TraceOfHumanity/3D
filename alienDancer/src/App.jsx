import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

export default function App() {
  return (
    <Canvas shadows camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
      <Experience />
    </Canvas>
  );
}
