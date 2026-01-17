import { describe, expect, it } from "vitest";
import { Object3D } from "three";

import { buildTransformFromObject } from "./editorStore";

describe("buildTransformFromObject", () => {
  it("captures position, rotation, and scale values", () => {
    const object = new Object3D();
    object.position.set(1, 2, 3);
    object.rotation.set(0.1, 0.2, 0.3);
    object.scale.set(2, 2, 2);

    const transform = buildTransformFromObject(object);

    expect(transform.position).toEqual({ x: 1, y: 2, z: 3 });
    expect(transform.rotation).toEqual({ x: 0.1, y: 0.2, z: 0.3 });
    expect(transform.scale).toEqual({ x: 2, y: 2, z: 2 });
  });
});
