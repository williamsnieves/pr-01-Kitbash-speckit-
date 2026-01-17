import type { Object3D } from "three";

export type PrimitiveType = "box" | "sphere" | "cylinder";

export type Transform = {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
};

export type MaterialModel = {
  color: string;
  roughness: number;
  metalness: number;
};

export type SceneObject = {
  id: string;
  name: string;
  kind: "primitive" | "asset";
  primitiveType?: PrimitiveType;
  object: Object3D;
  transform: Transform;
  material: MaterialModel;
};
