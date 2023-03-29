import './style.css'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const nearDist = 0.1;
const farDist =10000;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, nearDist, farDist);

const renderer = new THREE.WebGLRenderer(
  {
    canvas : document.querySelector('#bg'),
  }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(30);

camera.position.x = farDist * -2 ;
camera.position.z = 500;

renderer.render(scene,camera);

const geometry = new THREE.BoxGeometry(120,120,120)
const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe:true});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);



// cubes

const cubeSize = 120;
const cubeG = new THREE.BoxBufferGeometry(cubeSize,cubeSize,cubeSize);
const cubeM = new THREE.MeshNormalMaterial({});

const group = new THREE.Group();
const newMesh = new THREE.Mesh(geometry,material);
for(let i=0;i<350;i++){
  const mesh = new THREE.Mesh(cubeG,cubeM);
  const dist = farDist / 3;
  const distDouble = dist * 2;
  const tau = 2 * Math.PI;

  mesh.position.x = Math.random() * distDouble - dist;
  mesh.position.y = Math.random() * distDouble - dist;
  mesh.position.z = Math.random() * distDouble - dist;

  mesh.rotation.x = Math.random() * tau;
  mesh.rotation.y = Math.random() * tau;
  mesh.rotation.z = Math.random() * tau;

  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  newMesh.position.x = Math.random() * distDouble - dist;
  newMesh.position.y = Math.random() * distDouble - dist;
  newMesh.position.z = Math.random() * distDouble - dist;

  newMesh.rotation.x = Math.random() * tau;
  newMesh.rotation.y = Math.random() * tau;
  newMesh.rotation.z = Math.random() * tau;

  newMesh.matrixAutoUpdate = false;
  newMesh.updateMatrix();


  group.add(mesh);
  group.add(newMesh);  
}
scene.add(group);

//end


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50,0xFFFFFF, 0xFFFFFF);
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);



function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  

 
  const star = new THREE.Mesh(geometry, material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x , y , z);

 
 

  

  scene.add(star)


}

Array(500).fill().forEach(addStar);



// const spaceTexture = new THREE.TextureLoader().load('super3.jpg');

// scene.background = spaceTexture;

//Avatar

const arihantTexture = new THREE.TextureLoader().load('sun.jpg');

const arihant = new THREE.Mesh(
  new THREE.DodecahedronGeometry(2.0,0),
  new THREE.MeshNormalMaterial({color:0x131817})
);

scene.add(arihant)



const moon = new THREE.Mesh(
  new THREE.DodecahedronGeometry(5),
  new THREE.MeshNormalMaterial({})
);
scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);


const moon2 = new THREE.Mesh(
  new THREE.DodecahedronGeometry(6),
  new THREE.MeshNormalMaterial({})
);
scene.add(moon2)

moon2.position.z = 40;
moon2.position.setX(10);


// gltf file

const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/rasengan/scene.gltf', (gltfScene) =>{

  scene.add(gltfLoader.scene)
})

//sdf



function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  moon2.rotation.x += 0.05;
  moon2.rotation.y += 0.075;
  moon2.rotation.z += 0.05;

  group.rotation.x += 0.05;
  // group.rotation.y += 0.075;
  // group.rotation.z += 0.05;

  arihant.rotation.y += 0.01;
  arihant.rotation.z += 0.01;

 

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;



}
document.body.onscroll = moveCamera






function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  group.rotation.x += 0.005;
  group.rotation.y += 0.005;
  group.rotation.z += 0.005;

  newMesh.rotation.x += 0.005;
  newMesh.rotation.y += 0.005;
  newMesh.rotation.z += 0.005;

 

  controls.update();

  renderer.render(scene,camera);
}


animate();