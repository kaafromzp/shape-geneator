import { Layers } from 'three';

export const layersNone = new Layers();
layersNone.disableAll();
export const layersDefault = new Layers();
layersDefault.set( 0 );
export const layersRaycast = new Layers();
layersRaycast.set( 1 );
export const layersAll = new Layers();
layersAll.enableAll();
