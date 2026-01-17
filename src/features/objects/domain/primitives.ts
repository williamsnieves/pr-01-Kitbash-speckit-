import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
} from "three";

import type { PrimitiveType } from "../../../shared/domain/types";

export function createPrimitiveMesh(type: PrimitiveType) {
  const material = new MeshStandardMaterial({
    color: "#7aa2f7",
    roughness: 0.6,
    metalness: 0.1,
  });

  switch (type) {
    case "box":
      return new Mesh(new BoxGeometry(1, 1, 1), material);
    case "sphere":
      return new Mesh(new SphereGeometry(0.6, 32, 32), material);
    case "cylinder":
      return new Mesh(new CylinderGeometry(0.5, 0.5, 1, 32), material);
    default:
      return new Mesh(new BoxGeometry(1, 1, 1), material);
  }
}
