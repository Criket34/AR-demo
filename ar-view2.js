import * as THREE from "three";
import { MindARThree } from "mindar-image-three";

let mindarThree;
let renderAnimationId = null;

const container = document.getElementById("container");

mindarThree = new MindARThree({
  container: container,
  imageTargetSrc: "./doki-color.mind", // ここでマーカー指定
});

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

const geometry = new THREE.PlaneGeometry(1.5, 1.5);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});
const plane = new THREE.Mesh(geometry, material);
anchor.group.add(plane);

const update = () => {
  renderer.render(scene, camera);
  renderAnimationId = requestAnimationFrame(update);
};

const start = async () => {
  await mindarThree.start();
  update();
};

document.getElementById("startButton").addEventListener("click", () => {
  start();
});

document.getElementById("stopButton").addEventListener("click", () => {
  mindarThree.stop();
  cancelAnimationFrame(renderAnimationId);
});
