# PocketGarage-Web 設計

## Project Structure


PocketGarage-Web
│
├── index.html
├── app.js
│
├── js/
│ ├── globals.js
│ ├── scene.js
│ ├── lighting.js
│ ├── floor.js
│ ├── controls.js
│ ├── loader.js
│ ├── ui.js
│ ├── suspension.js
│ ├── steering.js
│ ├── animation.js
│ └── resize.js
│
├── models/
│ └── cap.glb
│
└── css/
└── style.css

## 基本方針
Three.jsによる車両カスタマイズガレージ。


---

## File Responsibility

### app.js
起動処理のみ。

役割：
- 各モジュール初期化
- アプリケーション開始


### globals.js
共有データ管理。

管理するもの：
- scene
- camera
- renderer
- controls
- 車両パーツ
- 現在設定値


### scene.js
3D環境。

役割：
- Scene生成
- Camera生成
- Renderer生成


### lighting.js
照明管理。

役割：
- AmbientLight
- DirectionalLight


### loader.js
車両読み込み。

役割：
- GLBロード
- body取得
- タイヤ取得


### suspension.js
車両姿勢制御。

役割：
- 車高
- キャンバー
- トレッド


### steering.js
操舵制御。

役割：
- 前輪ステアリング


### ui.js
操作UI。

役割：
- スライダー
- ボタン
- 設定変更


### animation.js
描画更新。

役割：
- requestAnimationFrame
- タイヤ回転
- アニメーション

