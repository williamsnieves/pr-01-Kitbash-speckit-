import { Box3, Vector3 } from "three";
import type { Object3D } from "three";

export function tagObjectForSelection(object: Object3D, id: string) {
  object.traverse((child) => {
    child.userData = child.userData ?? {};
    child.userData.sceneObjectId = id;
    if (child === object) {
      child.userData.exportable = true;
    }
  });
}

export function findSceneObjectId(target: Object3D | null): string | null {
  let current: Object3D | null = target;
  while (current) {
    if (current.userData?.sceneObjectId) {
      return String(current.userData.sceneObjectId);
    }
    current = current.parent;
  }
  return null;
}

export function normalizeObject(object: Object3D, targetSize = 2) {
  const box = new Box3().setFromObject(object);
  const center = new Vector3();
  const size = new Vector3();

  box.getCenter(center);
  box.getSize(size);

  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxAxis;

  object.position.sub(center);
  object.scale.setScalar(scale);
  object.updateMatrixWorld(true);
}
