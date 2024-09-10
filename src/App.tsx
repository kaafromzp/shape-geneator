
import Canvas from 'containers/3D/Canvas';
import React from 'react';
import Camera from './containers/3D/Camera';
import Scene from 'containers/3D/Scene';
import UI from 'containers/UI';

function App() {
  return (
    <>
      <Canvas>
        <Camera/>
        <Scene/>
      </Canvas>
      <UI/>
    </>
  );
}

export default App;
