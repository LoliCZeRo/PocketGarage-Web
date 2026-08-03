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

## Rule

ui.jsはstate.setupのみ変更する。

Three.jsオブジェクトの更新は
各機能モジュールが担当する。

例：
UI
↓
state.setup.frontTrack = 0.03
↓
suspension.js
↓
タイヤ位置更新

## Module Flow

app.js
 ↓
scene.js
 ↓
lighting.js
 ↓
floor.js
 ↓
controls.js
 ↓
loader.js
 ↓
ui.js
 ↓
animation.js

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

### floor.js
背景・地面生成。

役割：
- 地面生成
- 背景色設定

### resize.js
画面サイズ変更対応。

役割：
- Camera更新
- Rendererサイズ更新

## Shared State

state
├── scene
├── camera
├── renderer
├── controls
├── car
├── parts
│   ├── body
│   └── tyre
│       ├── LF
│       ├── RF
│       ├── LR
│       └── RR
├── base
│   ├── position
│   └── rotation
└── setup
    ├── frontTrack
    ├── rearTrack
    ├── frontCamber
    ├── rearCamber
    ├── frontRideHeight
    ├── rearRideHeight
    └── steering