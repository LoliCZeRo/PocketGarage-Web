// Three.jsの基本的なセットアップ
const scene = new THREE.Scene();

// カメラの設定
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// レンダラーの設定
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光の追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 仮モデルの追加
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const car = new THREE.Mesh(geometry, material);
scene.add(car);

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    car.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();