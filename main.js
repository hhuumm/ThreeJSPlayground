
import * as THREE from 'three';
import { Mesh } from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//LIGHT 
const light = new THREE.PointLight(0xffffff,1,1000);
light.position.set(0,10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(25,sizes.width / sizes.height ,0.1, 100);
camera.position.z = 35;
scene.add(camera);




//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);  //size of the canvas
renderer.render(scene,camera); //render the scene

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePen = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed =  2.75;


//Resize
window.addEventListener('resize',() => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width,sizes.height);
    renderer.render(scene,camera);
});

//Loop

const loop = () =>  {
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop();

//Timeline Magiccc
const t1 = gsap.timeline({defaults: {ease: 'power1.out'}});  
t1.fromTo(sphere.scale, {x: 0.1, y: 0.1, z: 0.1}, {x: 1, y: 1, z: 1, duration: 1.5});
t1.fromTo("nav", {y:"-100%"} , {y: "0%", duration: 1.5}, "-=1.5");
t1.fromTo(".title", {opacity: 0}, {opacity: 1, duration: 1.5}, "-=0.5");

//Mouse Animation Color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown",() => {mouseDown = true;});
window.addEventListener("mouseup",() => {mouseDown = false;})
window.addEventListener("mousemove",(e) => {
if(mouseDown)
{
  rgb= [
    Math.round((e.pageX / sizes.width)*255),
    Math.round((e.pageY / sizes.height)*255),
    150,
  ];

  //let's animate
  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
  gsap.to(sphere.material.color, {
    r:newColor.r, 
    g:newColor.g, 
    b:newColor.b,
  });

}

});