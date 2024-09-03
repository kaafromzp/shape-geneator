
import Canvas from 'containers/3D/Canvas';
import React from 'react';
import Camera from './containers/3D/Camera';
import Scene from 'containers/3D/Scene';

function App() {
  return (
    <Canvas>
      <Camera/>
      <Scene/>
    </Canvas>
  );
}

export default App;
