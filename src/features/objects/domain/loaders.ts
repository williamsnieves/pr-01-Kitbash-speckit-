import type { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadGltfAsset(file: File): Promise<Object3D> {
  const loader = new GLTFLoader();
  const url = URL.createObjectURL(file);

  try {
    const gltf = await new Promise<{ scene: Object3D }>((resolve, reject) => {
      loader.load(
        url,
        (result) => resolve(result),
        undefined,
        (error) => reject(error)
      );
    });
    return gltf.scene;
  } finally {
    URL.revokeObjectURL(url);
  }
}
