import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js";
import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.159.0/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("container");

const mindarThree = new MindARThree({
  container: container,
  imageTargetSrc: "./doki-color.mind",
});

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

const loader = new GLTFLoader();
loader.load("doki-color.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  anchor.group.add(model);
});

let renderAnimationId;
const update = () => {
  renderer.render(scene, camera);
  renderAnimationId = requestAnimationFrame(update);
};

const startButton = document.getElementById("startButton");
const stopButton  = document.getElementById("stopButton");

startButton.addEventListener("click", async () => {
  await mindarThree.start();
  update();
});

stopButton.addEventListener("click", () => {
  mindarThree.stop();
  cancelAnimationFrame(renderAnimationId);
});
