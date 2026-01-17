"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three-stdlib";

import type { SceneObject } from "../domain/types";
import { useEditorStore } from "../state/editorStore";
import { findSceneObjectId } from "../utils/sceneObject";

export function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    setThreeState,
    objects,
    selectObject,
    selectedId,
    autoRotateEnabled,
  } = useEditorStore();

  const objectsRef = useRef<Object3D[]>([]);
  const sceneObjectsRef = useRef<SceneObject[]>([]);
  const selectionRef = useRef(selectedId);
  const autoRotateRef = useRef(autoRotateEnabled);

  useEffect(() => {
    sceneObjectsRef.current = objects;
    objectsRef.current = objects.map((item) => item.object);
  }, [objects]);

  useEffect(() => {
    selectionRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    autoRotateRef.current = autoRotateEnabled;
  }, [autoRotateEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    scene.background = new Color("#0b0f19");

    const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const grid = new GridHelper(20, 20, "#2b3245", "#1a2033");
    grid.userData = grid.userData ?? {};
    grid.userData.exportable = false;
    scene.add(grid);

    const ambient = new AmbientLight(0xffffff, 0.7);
    ambient.userData = ambient.userData ?? {};
    ambient.userData.exportable = false;
    scene.add(ambient);

    const directional = new DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 7.5);
    directional.userData = directional.userData ?? {};
    directional.userData.exportable = false;
    scene.add(directional);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.08;
    orbitControls.target.set(0, 0, 0);
    orbitControls.update();

    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const clock = new Clock();

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (orbitControls && !orbitControls.enabled) {
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(objectsRef.current, true);
      if (intersects.length === 0) {
        selectObject(null);
        return;
      }

      const id = findSceneObjectId(intersects[0].object);
      selectObject(id);
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    let frameId = 0;
    const render = () => {
      const delta = clock.getDelta();
      orbitControls.update();

      if (autoRotateRef.current && selectionRef.current) {
        const selected = sceneObjectsRef.current.find(
          (item) => item.id === selectionRef.current
        );
        if (selected) {
          selected.object.rotation.y += delta * 0.6;
        }
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    render();

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    resizeObserver.observe(container);

    setThreeState({ scene, camera, renderer, orbitControls });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      orbitControls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [setThreeState, selectObject]);

  return <div ref={containerRef} className="scene-canvas" />;
}
