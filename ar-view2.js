import * as THREE from "three";
import { MindARThree } from "mindar-image-three";

const container = document.getElementById("container");

const mindarThree = new MindARThree({
  container: container,
  imageTargetSrc: "./doki-color.mind",
});

const { renderer, scene, camera } = mindarThree;

const anchor = mindarThree.addAnchor(0);
const geometry = new THREE.PlaneGeometry(1.5, 1.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
const plane = new THREE.Mesh(geometry, material);
anchor.group.add(plane);

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let renderAnimationId;
const update = () => {
  renderer.render(scene, camera);
  renderAnimationId = requestAnimationFrame(update);
};

const start = async () => {
  await mindarThree.start();
  update();
};

startButton.addEventListener("click", () => {
  start();
});
stopButton.addEventListener("click", () => {
  mindarThree.stop();
  cancelAnimationFrame(renderAnimationId);
});
