import { MeshBasicMaterial } from 'three';

export const materialOrigin = new MeshBasicMaterial( { color: 'orange' } );
export const materialPointOnArcUnselected = new MeshBasicMaterial( { color: 'cyan' } );
export const materialPointUnselected = new MeshBasicMaterial( { color: 'blue' } );
export const materialPointSelected = new MeshBasicMaterial( { color: 'red' } );
export const materialCurveUnselected = new MeshBasicMaterial( { color: 'grey' } );
export const materialCurveSelected = new MeshBasicMaterial( { color: 'green' } );

export const shapeMaterial = new MeshBasicMaterial( { color: 'magenta', transparent: true, opacity: 0.3 } );
