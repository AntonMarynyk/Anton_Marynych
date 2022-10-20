import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Ground from './components/Ground';
import Player from './components/Player';
import FPV from './components/FPV';
import Menu from './components/Menu';
import { Cubes } from './components/Cubes';
import { useRef } from 'react';
import { TextureSelector } from './components/TextureSelector';


function App() {
  const pos = useRef([0, 0, 0])
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 100]}/>
        <ambientLight intensity={0.5}/>
        <FPV/>
        <Physics>
          <Player pos={pos}/>
          <Cubes mypos={pos}/>
          <Ground pos={pos}/>
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
      <TextureSelector/>
      <Menu />
    </>
  );
}

export default App;
