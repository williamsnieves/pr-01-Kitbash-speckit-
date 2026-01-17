"use client";

import { useEffect, useRef } from "react";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

import { buildTransformFromObject, useEditorStore } from "../../../shared/state/editorStore";

export function TransformGizmo() {
  const { three, selectedId, getSelectedObject, updateSelectedTransform } = useEditorStore();
  const controlsRef = useRef<TransformControls | null>(null);

  useEffect(() => {
    if (!three.scene || !three.camera || !three.renderer) return;
    if (controlsRef.current) return;

    const controls = new TransformControls(three.camera, three.renderer.domElement);
    controls.userData = controls.userData ?? {};
    controls.userData.exportable = false;
    controls.addEventListener("objectChange", () => {
      const selected = getSelectedObject();
      if (selected) {
        updateSelectedTransform(buildTransformFromObject(selected.object));
      }
    });

    three.scene.add(controls);
    controlsRef.current = controls;

    return () => {
      controls.dispose();
      controlsRef.current = null;
      three.scene?.remove(controls);
    };
  }, [three.scene, three.camera, three.renderer, getSelectedObject, updateSelectedTransform]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const selected = getSelectedObject();
    if (selected) {
      controls.attach(selected.object);
    } else {
      controls.detach();
    }
  }, [selectedId, getSelectedObject]);

  return null;
}
