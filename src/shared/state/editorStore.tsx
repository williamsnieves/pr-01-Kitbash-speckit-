/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Color } from "three";

import type { MaterialModel, SceneObject, Transform } from "../domain/types";

type ThreeState = {
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  renderer: WebGLRenderer | null;
};

type EditorState = {
  three: ThreeState;
  objects: SceneObject[];
  selectedId: string | null;
};

type EditorContextValue = EditorState & {
  setThreeState: (next: ThreeState) => void;
  addObject: (object: SceneObject) => void;
  selectObject: (id: string | null) => void;
  removeSelected: () => void;
  updateSelectedTransform: (transform: Transform) => void;
  updateSelectedMaterial: (material: MaterialModel) => void;
  getSelectedObject: () => SceneObject | null;
};

const EditorContext = createContext<EditorContextValue | null>(null);

const DEFAULT_MATERIAL: MaterialModel = {
  color: "#7aa2f7",
  roughness: 0.6,
  metalness: 0.1,
};

const DEFAULT_TRANSFORM: Transform = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EditorState>({
    three: { scene: null, camera: null, renderer: null },
    objects: [],
    selectedId: null,
  });

  const setThreeState = useCallback((next: ThreeState) => {
    setState((prev) => ({ ...prev, three: next }));
  }, []);

  const addObject = useCallback((object: SceneObject) => {
    if (!object.object) {
      return;
    }
    if (!object.object.userData) {
      object.object.userData = {};
    }
    object.object.userData.exportable = true;
    setState((prev) => ({
      ...prev,
      objects: [...prev.objects, object],
      selectedId: object.id,
    }));
  }, []);

  const selectObject = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const removeSelected = useCallback(() => {
    setState((prev) => {
      if (!prev.selectedId) return prev;
      const target = prev.objects.find((item) => item.id === prev.selectedId);
      if (target && prev.three.scene) {
        prev.three.scene.remove(target.object);
      }
      const nextObjects = prev.objects.filter(
        (item) => item.id !== prev.selectedId
      );
      return { ...prev, objects: nextObjects, selectedId: null };
    });
  }, []);

  const updateSelectedTransform = useCallback((transform: Transform) => {
    setState((prev) => {
      if (!prev.selectedId) return prev;
      const nextObjects = prev.objects.map((item) =>
        item.id === prev.selectedId ? { ...item, transform } : item
      );
      return { ...prev, objects: nextObjects };
    });
  }, []);

  const updateSelectedMaterial = useCallback((material: MaterialModel) => {
    setState((prev) => {
      if (!prev.selectedId) return prev;
      const nextObjects = prev.objects.map((item) =>
        item.id === prev.selectedId ? { ...item, material } : item
      );
      return { ...prev, objects: nextObjects };
    });
  }, []);

  const getSelectedObject = useCallback(() => {
    return state.objects.find((item) => item.id === state.selectedId) ?? null;
  }, [state.objects, state.selectedId]);

  const value = useMemo<EditorContextValue>(
    () => ({
      ...state,
      setThreeState,
      addObject,
      selectObject,
      removeSelected,
      updateSelectedTransform,
      updateSelectedMaterial,
      getSelectedObject,
    }),
    [
      state,
      setThreeState,
      addObject,
      selectObject,
      removeSelected,
      updateSelectedTransform,
      updateSelectedMaterial,
      getSelectedObject,
    ]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditorStore() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorStore must be used within EditorProvider");
  }
  return context;
}

export function buildTransformFromObject(object: Object3D): Transform {
  return {
    position: {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    },
    rotation: {
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z,
    },
    scale: { x: object.scale.x, y: object.scale.y, z: object.scale.z },
  };
}

export function buildDefaultMaterial(): MaterialModel {
  return { ...DEFAULT_MATERIAL };
}

export function applyMaterial(object: Object3D, material: MaterialModel) {
  object.traverse((child) => {
    if ("material" in child) {
      const mesh = child as { material: { color?: Color; roughness?: number; metalness?: number } };
      if (mesh.material?.color) {
        mesh.material.color = new Color(material.color);
      }
      if (typeof mesh.material?.roughness === "number") {
        mesh.material.roughness = material.roughness;
      }
      if (typeof mesh.material?.metalness === "number") {
        mesh.material.metalness = material.metalness;
      }
    }
  });
}

export const DEFAULT_TRANSFORM_VALUES = DEFAULT_TRANSFORM;
