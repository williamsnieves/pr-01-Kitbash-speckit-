"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { useEditorStore } from "../state/editorStore";

export function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setThreeState } = useEditorStore();

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

    let frameId = 0;
    const render = () => {
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

    setThreeState({ scene, camera, renderer });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [setThreeState]);

  return <div ref={containerRef} className="scene-canvas" />;
}
