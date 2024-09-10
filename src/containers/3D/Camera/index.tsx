import { useThree } from '@react-three/fiber';
import { layersAll } from 'helpers/layers';
import React, { useCallback, useEffect } from 'react';
import useStore from 'store/index';
import { OrthographicCamera } from 'three';

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
  const width = useThree( ( state ) => state.gl.domElement.width );
  const height = useThree( ( state ) => state.gl.domElement.height );

  const updateCamera = useCallback( () => {
    const fitSize = fitImgToSpace(
      { width: camera.right - camera.left, height: camera.top - camera.bottom },
      { width, height }
    );
    const k = Math.max( fitSize.width / ( camera.right - camera.left ), fitSize.height / ( camera.top - camera.bottom ) );
    const size = { width: width / k, height: height / k };
    camera.left = -size.width / 2;
    camera.right = size.width / 2;
    camera.top = size.height / 2;
    camera.bottom = -size.height / 2;
    camera.updateMatrixWorld( true );
    camera.updateProjectionMatrix();
    camera.layers = layersAll;
  }, [
    camera,
    height,
    width
  ] );
  useEffect( () => {
    window.addEventListener( 'resize', updateCamera, false );
    updateCamera();

    return () => {
      window.removeEventListener( 'resize', updateCamera, false );
    };
  }, [updateCamera] );

  return null;
}
