'use client';

import React from 'react';
import { View } from '@react-three/drei';

interface SceneViewProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * SceneView acts as a tracking placeholder in the HTML.
 * Anything placed inside SceneView will be rendered by the global MasterScene Canvas
 * at the exact position of this div.
 */
const SceneView: React.FC<SceneViewProps> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      <View className="absolute inset-0">
        {children}
      </View>
    </div>
  );
};

export default SceneView;
