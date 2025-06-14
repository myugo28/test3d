import { Edges, Grid, OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import './App.css';

interface Box {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
  color: string;  // Hex color code (e.g. '#ff0000')
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

interface Container {
  id: string;
  length: number;
  width: number;
  height: number;
  color: string;  // Hex color code (e.g. '#ff0000')
  boxes: Box[];
}

interface Data {
  container: Container;
}

const Box3D: React.FC<{ box: Box }> = ({ box }) => {
  // Calculate dimensions based on rotation
  const getDimensions = () => {
    const { x, y, z } = box.rotation;
    let length = box.length;
    let width = box.width;
    let height = box.height;

    // Handle 90-degree rotations
    if (x === 90 || x === 270) {
      [width, height] = [height, width];
    }
    if (y === 90 || y === 270) {
      [length, width] = [width, length];
    }
    if (z === 90 || z === 270) {
      [length, height] = [height, length];
    }

    return { length, width, height };
  };

  const dimensions = getDimensions();

  return (
    <group
      position={[box.x + dimensions.length / 2, box.z + dimensions.height / 2, box.y + dimensions.width / 2]}
      rotation={[box.rotation.x * Math.PI / 180, box.rotation.z * Math.PI / 180, box.rotation.y * Math.PI / 180]}
    >
      <mesh>
        <boxGeometry args={[box.length, box.height, box.width]} />
        <meshStandardMaterial color={box.color} transparent opacity={0.3} />
        <Edges
          scale={1}
          threshold={15}
          color={box.color}
          linewidth={1}
        />
      </mesh>

      {/* Box name text - front */}
      <Text
        position={[0, 0, dimensions.width / 2 + 1]}
        rotation={[0, 0, 0]}
        fontSize={2}
        color="#484848"
        anchorX="center"
        anchorY="middle"
        quaternion={[0, 0, 0, 1]}
      >
        {box.name}
      </Text>

      {/* Bottom grid */}
      <Grid
        position={[0, 0, -dimensions.width / 2]}
        args={[dimensions.length, dimensions.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
      {/* Top grid */}
      <Grid
        position={[0, 0, dimensions.width / 2]}
        args={[dimensions.length, dimensions.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
      {/* Front grid */}
      <Grid
        position={[0, dimensions.height / 2, 0]}
        args={[dimensions.length, dimensions.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* Back grid */}
      <Grid
        position={[0, -dimensions.height / 2, 0]}
        args={[dimensions.length, dimensions.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* Left grid */}
      <Grid
        position={[-dimensions.length / 2, 0, 0]}
        args={[dimensions.height, dimensions.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[0, 0, Math.PI / 2]}
      />
      {/* Right grid */}
      <Grid
        position={[dimensions.length / 2, 0, 0]}
        args={[dimensions.height, dimensions.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[0, 0, Math.PI / 2]}
      />
    </group>
  );
};

const Container3D: React.FC<{ container: Container }> = ({ container }) => {
  return (
    <group>
      <mesh position={[container.length / 2, container.height / 2, container.width / 2]}>
        <boxGeometry args={[container.length, container.height, container.width]} />
        <meshStandardMaterial color={container.color} transparent opacity={0.1} wireframe />
      </mesh>
      {/* Bottom grid */}
      <Grid
        position={[container.length / 2, 0, container.width / 2]}
        args={[container.length, container.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
      {/* Top grid */}
      <Grid
        position={[container.length / 2, container.height, container.width / 2]}
        args={[container.length, container.width]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
      {/* Front grid */}
      <Grid
        position={[container.length / 2, container.height / 2, container.width]}
        args={[container.length, container.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* Back grid */}
      <Grid
        position={[container.length / 2, container.height / 2, 0]}
        args={[container.length, container.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* Left grid */}
      <Grid
        position={[0, container.height / 2, container.width / 2]}
        args={[container.width, container.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      {/* Right grid */}
      <Grid
        position={[container.length, container.height / 2, container.width / 2]}
        args={[container.width, container.height]}
        cellSize={10}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={50}
        sectionThickness={0.5}
        sectionColor="#4a6f9e"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />

      {container.boxes.map((box) => (
        <Box3D key={box.id} box={box} />
      ))}
    </group>
  );
};

function App() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // Load initial data from data_sample.json
    fetch('/data_sample.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setJsonInput(JSON.stringify(data, null, 2));
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const handleJsonInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setJsonInput(input);
    try {
      const parsedData = JSON.parse(input);
      setData(parsedData);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        <textarea
          value={jsonInput}
          onChange={handleJsonInput}
          style={{ width: '100%', height: '100%', fontFamily: 'monospace' }}
        />
      </div>
      <div style={{ width: '50%', height: '100%' }}>
        <Canvas camera={{ position: [150, 150, 150], fov: 50 }}>
          <color attach="background" args={['#f0f0f0']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[100, 100, 100]} intensity={1} />
          <OrbitControls />
          {data && <Container3D container={data.container} />}
        </Canvas>
      </div>
    </div>
  );
}

export default App;
