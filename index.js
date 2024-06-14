import * as three from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new three.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new three.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new three.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new three.IcosahedronGeometry(1.0, 2);
const mat = new three.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true
});
const mesh = new three.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new three.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new three.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new three.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    //mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
    //mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    constrols.update();
}

animate();