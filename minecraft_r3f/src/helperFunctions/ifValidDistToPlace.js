const DISTANCE_TO_CUBE = 4;

export default function ifValidDisToPlace(pos_place, pos_char){
    const [x, y, z] = pos_place
    const [x_p, y_p, z_p] = pos_char
    if (Math.sqrt((x-x_p)**2 + (y-y_p)**2 +(z-z_p)**2) < DISTANCE_TO_CUBE) {
        return true;
    }
    return false;
}