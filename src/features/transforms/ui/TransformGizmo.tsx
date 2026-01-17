"use client";

import { useEffect, useRef } from "react";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

import { buildTransformFromObject, useEditorStore } from "../../../shared/state/editorStore";

export function TransformGizmo() {
  const {
    three,
    selectedId,
    getSelectedObject,
    updateSelectedTransform,
    transformMode,
  } = useEditorStore();
  const controlsRef = useRef<TransformControls | null>(null);
  const helperRef = useRef<THREE.Object3D | null>(null);
  const lastPositionRef = useRef<THREE.Vector3 | null>(null);
  const fastMoveRef = useRef(false);

  useEffect(() => {
    if (!three.scene || !three.camera || !three.renderer) return;
    if (controlsRef.current) return;

    const controls = new TransformControls(three.camera, three.renderer.domElement);
    const helper = controls.getHelper();
    helper.userData = helper.userData ?? {};
    helper.userData.exportable = false;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift" || event.metaKey) {
        fastMoveRef.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift" || event.metaKey) {
        fastMoveRef.current = false;
      }
    };

    const handleMouseDown = () => {
      const selected = getSelectedObject();
      if (selected) {
        lastPositionRef.current = selected.object.position.clone();
      }
    };

    const handleMouseUp = () => {
      lastPositionRef.current = null;
    };

    controls.addEventListener("mouseDown", handleMouseDown);
    controls.addEventListener("mouseUp", handleMouseUp);

    controls.addEventListener("objectChange", () => {
      const selected = getSelectedObject();
      if (!selected) return;

      if (controls.mode === "translate" && fastMoveRef.current && lastPositionRef.current) {
        const delta = selected.object.position.clone().sub(lastPositionRef.current);
        selected.object.position.addScaledVector(delta, 2);
        lastPositionRef.current.copy(selected.object.position);
      } else if (controls.mode === "translate" && lastPositionRef.current) {
        lastPositionRef.current.copy(selected.object.position);
      }

      updateSelectedTransform(buildTransformFromObject(selected.object));
    });

    controls.addEventListener("dragging-changed", (event) => {
      if (three.orbitControls) {
        three.orbitControls.enabled = !event.value;
      }
    });

    three.scene.add(helper);
    controlsRef.current = controls;
    helperRef.current = helper;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      controls.dispose();
      controlsRef.current = null;
      if (helperRef.current) {
        three.scene?.remove(helperRef.current);
      }
      helperRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [three.scene, three.camera, three.renderer, getSelectedObject, updateSelectedTransform]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.setMode(transformMode);
    const selected = getSelectedObject();
    if (selected) {
      controls.attach(selected.object);
    } else {
      controls.detach();
    }
  }, [selectedId, getSelectedObject, transformMode]);

  return null;
}
