import { useThree } from '@react-three/fiber';
import { layersAll } from 'helpers/layers';
import React, { useEffect } from 'react';
import useStore from 'store/index';
import { Box3, Group, OrthographicCamera, Vector3 } from 'three';

export type sizes = {
  width: number;
  height: number;
}

export const fitImgToSpace = ( imageSizes: sizes, availableSpaceSize: sizes ): sizes => {
  let width = imageSizes.width / imageSizes.height * availableSpaceSize.height;
  let height = availableSpaceSize.height;

  if ( imageSizes.width / imageSizes.height > availableSpaceSize.width / availableSpaceSize.height ) {
    width = availableSpaceSize.width;
    height = imageSizes.height / imageSizes.width * availableSpaceSize.width;
  }

  return {
    width,
    height
  };
};

export default function Camera() {
  const camera = useThree( ( state ) => state.camera as OrthographicCamera );
  const scene = useThree( ( state ) => state.scene );
  const segments = useStore( ( state ) => state.segments );
  const { width, height } = useThree( ( state ) => state.gl.domElement );
  useEffect( () => {
    const f = ( ) => {
      const bBox = new Box3().setFromObject( scene.getObjectByName( 'bBoxBase' ) as Group );
      const bBoxSize = new Vector3();
      const center = new Vector3();
      bBox.getSize( bBoxSize );
      bBox.getCenter( center );
      const fitSize = fitImgToSpace( { width: bBoxSize.x, height: bBoxSize.y }, { width, height } );
      const k = fitSize.width / bBoxSize.x;
      const size = { width: width / k * 1.2, height: height / k * 1.2 };
      // console.log( { width: bBoxSize.x, height: bBoxSize.y }, { width, height }, fitSize, k, size, center );

      camera.near = 1e-3;
      camera.far = 1e2;
      camera.position.set( center.x, center.y, 10 );
      camera.left = 0 * center.x - size.width / 2;
      camera.right = 0 * center.x + size.width / 2;
      camera.top = 0 * center.y + size.height / 2;
      camera.bottom = 0 * center.y - size.height / 2;
      camera.updateMatrixWorld( true );
      camera.updateProjectionMatrix();
      scene.add( camera );
      camera.layers = layersAll;
    };
    window.addEventListener( 'resize', f );
    f();

    // return () => {};
  }, [
    scene,
    width,
    height,
    camera,
    segments
  ] );

  return null;
}
