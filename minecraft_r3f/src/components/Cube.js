import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import React from 'react'
import { useStore } from '../hooks/useStore'
import ifValidDisToPlace from '../helperFunctions/ifValidDistToPlace'

const Cube = ({ position, texture, mypos}) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])
    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh 
        onClick={(e)=> {
            e.stopPropagation();
            const clickedFace = -(-e.faceIndex)
            const {x, y, z} = ref.current.position;

            const pos_place = Object.values(e.point).map(val => Math.ceil(val))
            const pos_char = mypos.current;

            if(ifValidDisToPlace(pos_place, pos_char)){
                if(e.altKey) {
                    removeCube(x, y, z)
                    return
                }
                else if(clickedFace === 0 || clickedFace === 1 ) {
                    addCube(x+1, y, z)
                    return
                }
                else if(clickedFace === 2 || clickedFace === 3 ) {
                    addCube(x-1, y, z)
                    return
                }
                else if(clickedFace === 4 || clickedFace === 5 ) {
                    addCube(x, y+1, z)
                    return
                }
                else if(clickedFace === 6 || clickedFace === 7 ) {
                    addCube(x, y-1, z)
                    return
                }
                else if(clickedFace === 8 || clickedFace === 9 ) {
                    addCube(x, y, z + 1)
                    return
                }
                else if(clickedFace === 10 || clickedFace === 11 ) {
                    addCube(x, y, z-1)
                    return
                }
            }
        }}
        ref={ref}
        >
            <boxBufferGeometry attach='geometry'/>
            <meshStandardMaterial attach='material' map={activeTexture}/>
        </mesh>
    )
}

export default Cube