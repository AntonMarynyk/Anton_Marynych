import React from 'react'
import { usePlane } from '@react-three/cannon'
import {groundTexture} from '../images/textures'
import { useStore } from '../hooks/useStore'
import ifValidDisToPlace from '../helperFunctions/ifValidDistToPlace'


// const DISTANCE_TO_CUBE = 4;

const Ground = ({pos}) => {
    const [ref] = usePlane(()=> ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0,-0.5,0]
    }))
    const [addCube] = useStore((state) => [state.addCube])

    groundTexture.repeat.set(100, 100)

    return (
      <mesh 
      onClick={(e)=> {
        e.stopPropagation();

        const pos_place = Object.values(e.point).map(val => Math.ceil(val))
        const pos_char = pos.current;

        if(ifValidDisToPlace(pos_place, pos_char)) {
          const [x, y, z] = pos_place;
          addCube(x, y, z)
        }
        
        // console.log(Math.sqrt((x-x_p)**2 + (y-y_p)**2 +(z-z_p)**2))
        // addCube(x, y, z)
        // console.log({PLayerPos: pos.current, ClickPos:e.point})
      }}
      ref={ref}
      >
          <planeBufferGeometry attatch='geometry' args={[100, 100]}/>
          <meshStandardMaterial attach='material' map={groundTexture}/>
      </mesh>
    )
}

export default Ground