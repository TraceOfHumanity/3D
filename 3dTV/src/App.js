import React, { Suspense, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF, Effects } from "@react-three/drei";
import "./index.css";
import * as THREE from "three";
import url from "./space.mp4";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

extend({ GlitchPass, BloomPass });

const TV = () => {
  const { nodes } = useGLTF("Tv.gltf");

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });
  console.log(nodes);

  return (
    <group rotation={[1.8, 0, 0]}>
      <mesh geometry={nodes.TV.geometry}>
        {/* <boxBufferGeometry args={[tvWidth, tvHeight, tvDepth]} /> */}
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh rotation={[-1.57, 0, 0]} position={[0, 0.2, -2]}>
        <planeGeometry args={[5.5, 3.3]} />
        <meshStandardMaterial emissive={"gray"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      <fog attach="fog" args={["black", 10, 80]} />
      <Effects>
        <bloomPass attachArray="passes" />
        <glitchPass attachArray="passes" />
      </Effects>
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      <directionalLight intensity={0.2} />
      <Suspense fallback={null}>
        <TV />
      </Suspense>
      <Floor />
    </Canvas>
  );
}
