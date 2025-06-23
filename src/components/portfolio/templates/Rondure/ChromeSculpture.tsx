// src/components/ChromeSculpture.tsx

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Configuration Constants
const LIGHT_CONFIG = {
  KEY_LIGHT_INTENSITY: 1500,
  FILL_LIGHT_INTENSITY: 1200,
  RIM_LIGHT_INTENSITY: 800,
  AMBIENT_LIGHT_INTENSITY: 0.05,
  MIN_INTENSITY_MULTIPLIER: 0.3,
  MAX_INTENSITY_MULTIPLIER: 15.5,
  KEY_LIGHT_MOVEMENT: 12,
  FILL_LIGHT_MOVEMENT: 2,
  RIM_LIGHT_MOVEMENT: 1.5,
  KEY_LIGHT_COLOR: new THREE.Color("rgb(255,255,255)"),
  FILL_LIGHT_COLOR: new THREE.Color("rgb(138,172,200)"),
  RIM_LIGHT_COLOR: new THREE.Color("rgb(231,221,255)"),
  KEY_LIGHT_ANGLE: Math.PI / 6,
  FILL_LIGHT_ANGLE: Math.PI / 6,
  RIM_LIGHT_ANGLE: Math.PI / 4,
  KEY_LIGHT_PENUMBRA: 0.5,
  FILL_LIGHT_PENUMBRA: 0.8,
};

const ANIMATION_CONFIG = {
  LERP_SPEED: 0.05,
  FADE_OUT_SPEED: 0.05,
  FADE_IN_SPEED: 0.05,
  ROTATION_SPEED_X: 0.0,
  ROTATION_SPEED_Y: 0.0,
  ROTATION_SPEED_Z: 0.001,
};

const GEOMETRY_CONFIG = {
  TORUS_RADIUS: 1.8,
  TORUS_TUBE: 0.5,
  TORUS_TUBULAR_SEGMENTS: 100,
  TORUS_RADIAL_SEGMENTS: 25,
  TORUS_P: 2,
  TORUS_Q: 3,
};

const MATERIAL_CONFIG = {
  METALNESS: 0.99999,
  ROUGHNESS: 0.05,
  COLOR: 0xffffff,
  CLEARCOAT: 1.0,
  CLEARCOAT_ROUGHNESS: 0.1,
  TRANSMISSION: 0.9,
  OPACITY: 1.0,
  IOR: 2.5,
};

const EFFECTS_CONFIG = {
  BLOOM_STRENGTH: 0.015,
  BLOOM_RADIUS: 0.075,
  BLOOM_THRESHOLD: 0.2,
  FOV: 75,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 1000,
  CAMERA_POSITION: { x: -3.3, y: 0, z: 6.7 },
};

const ChromeSculpture: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseInsideRef = useRef(true);
  const blurRef = useRef(0);
  const lightTargets = useRef({
    keyLight: { x: 5, y: 5, z: 5 },
    fillLight: { x: -5, y: -5, z: 3 },
    rimLight: { x: 0, y: 0, z: -10 },
  });
  const intensityTargets = useRef({
    keyLight: 0,
    fillLight: 0,
    rimLight: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) {
      return;
    }
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      EFFECTS_CONFIG.FOV,
      currentMount.clientWidth / currentMount.clientHeight,
      EFFECTS_CONFIG.CAMERA_NEAR,
      EFFECTS_CONFIG.CAMERA_FAR,
    );
    camera.position.set(
      EFFECTS_CONFIG.CAMERA_POSITION.x,
      EFFECTS_CONFIG.CAMERA_POSITION.y,
      EFFECTS_CONFIG.CAMERA_POSITION.z,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Initialize blur effect
    currentMount.style.filter = `blur(${blurRef.current}px)`;
    currentMount.style.webkitFilter = `blur(${blurRef.current}px)`;

    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(currentMount.clientWidth, currentMount.clientHeight),
      EFFECTS_CONFIG.BLOOM_STRENGTH,
      EFFECTS_CONFIG.BLOOM_RADIUS,
      EFFECTS_CONFIG.BLOOM_THRESHOLD,
    );
    composer.addPass(bloomPass);

    const smaaPass = new SMAAPass();
    composer.addPass(smaaPass);

    const geometry = new THREE.TorusKnotGeometry(
      GEOMETRY_CONFIG.TORUS_RADIUS,
      GEOMETRY_CONFIG.TORUS_TUBE,
      GEOMETRY_CONFIG.TORUS_TUBULAR_SEGMENTS,
      GEOMETRY_CONFIG.TORUS_RADIAL_SEGMENTS,
      GEOMETRY_CONFIG.TORUS_P,
      GEOMETRY_CONFIG.TORUS_Q,
    );
    const material = new THREE.MeshPhysicalMaterial({
      metalness: MATERIAL_CONFIG.METALNESS,
      roughness: MATERIAL_CONFIG.ROUGHNESS,
      color: MATERIAL_CONFIG.COLOR,
      clearcoat: MATERIAL_CONFIG.CLEARCOAT,
      clearcoatRoughness: MATERIAL_CONFIG.CLEARCOAT_ROUGHNESS,
      transmission: MATERIAL_CONFIG.TRANSMISSION,
      opacity: MATERIAL_CONFIG.OPACITY,
      transparent: true,
      ior: MATERIAL_CONFIG.IOR,
    });

    const sculpture = new THREE.Mesh(geometry, material);
    scene.add(sculpture);

    const keyLight = new THREE.SpotLight(
      LIGHT_CONFIG.KEY_LIGHT_COLOR,
      LIGHT_CONFIG.KEY_LIGHT_INTENSITY,
    );
    keyLight.position.set(5, 5, 5);
    keyLight.angle = LIGHT_CONFIG.KEY_LIGHT_ANGLE;
    keyLight.penumbra = LIGHT_CONFIG.KEY_LIGHT_PENUMBRA;
    scene.add(keyLight);

    const fillLight = new THREE.SpotLight(
      LIGHT_CONFIG.FILL_LIGHT_COLOR,
      LIGHT_CONFIG.FILL_LIGHT_INTENSITY,
    );
    fillLight.position.set(-5, -5, 3);
    fillLight.angle = LIGHT_CONFIG.FILL_LIGHT_ANGLE;
    fillLight.penumbra = LIGHT_CONFIG.FILL_LIGHT_PENUMBRA;
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(
      LIGHT_CONFIG.RIM_LIGHT_COLOR,
      LIGHT_CONFIG.RIM_LIGHT_INTENSITY,
    );
    rimLight.position.set(0, 0, -10);
    rimLight.angle = LIGHT_CONFIG.RIM_LIGHT_ANGLE;
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      LIGHT_CONFIG.AMBIENT_LIGHT_INTENSITY,
    );
    scene.add(ambientLight);
    const handleMouseMove = (event: MouseEvent) => {
      if (!currentMount) return;

      const rect = currentMount.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      mouseInsideRef.current = true;
    };

    const handleMouseLeave = () => {
      mouseInsideRef.current = false;
    };

    currentMount.addEventListener("mousemove", handleMouseMove);
    currentMount.addEventListener("mouseenter", handleMouseEnter);
    currentMount.addEventListener("mouseleave", handleMouseLeave);
    const animate = () => {
      requestAnimationFrame(animate);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const normalizedDistance = Math.min(distanceFromCenter / Math.sqrt(2), 1);
      const intensityMultiplier = 1 - normalizedDistance;
      const isMouseInside = mouseInsideRef.current;

      // Calculate blur based on distance from center
      // When mouse is at center (on shape): blur = 0px
      // When mouse is at edge or outside: blur = 2.5px
      const targetBlur = isMouseInside ? normalizedDistance * 1.5 : 1.5;
      blurRef.current += (targetBlur - blurRef.current) * 0.1; // Smooth transition

      // Update the DOM element's blur filter
      if (currentMount) {
        currentMount.style.filter = `blur(${blurRef.current}px)`;
        currentMount.style.webkitFilter = `blur(${blurRef.current}px)`;
      }

      if (isMouseInside) {
        intensityTargets.current.keyLight =
          LIGHT_CONFIG.KEY_LIGHT_INTENSITY *
          (LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER +
            intensityMultiplier *
              (LIGHT_CONFIG.MAX_INTENSITY_MULTIPLIER -
                LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER));
        intensityTargets.current.fillLight =
          LIGHT_CONFIG.FILL_LIGHT_INTENSITY *
          (LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER +
            intensityMultiplier *
              (LIGHT_CONFIG.MAX_INTENSITY_MULTIPLIER -
                LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER));
        intensityTargets.current.rimLight =
          LIGHT_CONFIG.RIM_LIGHT_INTENSITY *
          (LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER +
            intensityMultiplier *
              (LIGHT_CONFIG.MAX_INTENSITY_MULTIPLIER -
                LIGHT_CONFIG.MIN_INTENSITY_MULTIPLIER));
      } else {
        intensityTargets.current.keyLight = 0;
        intensityTargets.current.fillLight = 0;
        intensityTargets.current.rimLight = 0;
      }

      const fadeSpeed = isMouseInside
        ? ANIMATION_CONFIG.FADE_IN_SPEED
        : ANIMATION_CONFIG.FADE_OUT_SPEED;

      keyLight.intensity +=
        (intensityTargets.current.keyLight - keyLight.intensity) * fadeSpeed;
      fillLight.intensity +=
        (intensityTargets.current.fillLight - fillLight.intensity) * fadeSpeed;
      rimLight.intensity +=
        (intensityTargets.current.rimLight - rimLight.intensity) * fadeSpeed;

      keyLight.intensity = Math.max(0, keyLight.intensity);
      fillLight.intensity = Math.max(0, fillLight.intensity);
      rimLight.intensity = Math.max(0, rimLight.intensity);

      sculpture.rotation.x += ANIMATION_CONFIG.ROTATION_SPEED_X;
      sculpture.rotation.y += ANIMATION_CONFIG.ROTATION_SPEED_Y;
      sculpture.rotation.z += ANIMATION_CONFIG.ROTATION_SPEED_Z;

      lightTargets.current.keyLight.x =
        5 + mouseX * LIGHT_CONFIG.KEY_LIGHT_MOVEMENT;
      lightTargets.current.keyLight.y =
        5 + mouseY * LIGHT_CONFIG.KEY_LIGHT_MOVEMENT;

      lightTargets.current.fillLight.x =
        -5 - mouseX * LIGHT_CONFIG.FILL_LIGHT_MOVEMENT;
      lightTargets.current.fillLight.y =
        -5 - mouseY * LIGHT_CONFIG.FILL_LIGHT_MOVEMENT;

      lightTargets.current.rimLight.x =
        mouseX * LIGHT_CONFIG.RIM_LIGHT_MOVEMENT;
      lightTargets.current.rimLight.y =
        mouseY * LIGHT_CONFIG.RIM_LIGHT_MOVEMENT;

      const lerpFactor = ANIMATION_CONFIG.LERP_SPEED;

      keyLight.position.x +=
        (lightTargets.current.keyLight.x - keyLight.position.x) * lerpFactor;
      keyLight.position.y +=
        (lightTargets.current.keyLight.y - keyLight.position.y) * lerpFactor;
      keyLight.position.z +=
        (lightTargets.current.keyLight.z - keyLight.position.z) * lerpFactor;

      fillLight.position.x +=
        (lightTargets.current.fillLight.x - fillLight.position.x) * lerpFactor;
      fillLight.position.y +=
        (lightTargets.current.fillLight.y - fillLight.position.y) * lerpFactor;
      fillLight.position.z +=
        (lightTargets.current.fillLight.z - fillLight.position.z) * lerpFactor;

      rimLight.position.x +=
        (lightTargets.current.rimLight.x - rimLight.position.x) * lerpFactor;
      rimLight.position.y +=
        (lightTargets.current.rimLight.y - rimLight.position.y) * lerpFactor;
      rimLight.position.z +=
        (lightTargets.current.rimLight.z - rimLight.position.z) * lerpFactor;

      composer.render();
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);

      bloomPass.resolution.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount) {
        currentMount.removeEventListener("mousemove", handleMouseMove);
        currentMount.removeEventListener("mouseenter", handleMouseEnter);
        currentMount.removeEventListener("mouseleave", handleMouseLeave);
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      keyLight.dispose();
      fillLight.dispose();
      rimLight.dispose();
      ambientLight.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="h-full w-full" />;
};

export default ChromeSculpture;
