import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 20;

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00cc96 });
const torus = new THREE.Mesh(geometry, material);


torus.position.z = 20
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement);

const addStar = (flag) => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xf0ff4f });
  flag = !flag;
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star);
};

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const myBox = new THREE.TextureLoader().load('me1.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), 
  new THREE.MeshBasicMaterial( {map: myBox})
); 

me.position.x = 3; 
me.position.z = 15; 
me.position.y = 0; 
me.rotation.z = -.3;
me.rotation.y = -.4;



scene.add(me);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32), 
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);
scene.add(moon); 
let moonRadians = 3; 
moon.position.y = 10;

moon.position.x = camera.position.x - Math.cos(moonRadians) * 150; 
moon.position.z = -camera.position.z + Math.sin(moonRadians) * 150;


const moveCamera = () => {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  me.rotation.y +=  t * 0.000075;
  me.rotation.z +=  t * 0.00005;

  camera.position.z = 20 + t * -.01;
  camera.position.x = t * .02; 
  camera.rotation.y = t * 0.0007;
  

}

document.body.onscroll = moveCamera; 


const animate = () => {
  requestAnimationFrame(animate);

  moonRadians += .004
  moon.position.x = camera.position.x + Math.cos(moonRadians) * 150; 
  moon.position.z = -camera.position.z + Math.sin(moonRadians) * 150;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update();

  renderer.render(scene, camera);
};

animate();
