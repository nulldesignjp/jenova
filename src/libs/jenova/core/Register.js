import Scene from './Scene.js'
import SceneManager from './SceneManager.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Size from './Size.js'
import Time from './Time.js'
import Scroll from './Scroll.js'
import Wheel from './Wheel.js'
import Wire from './Wire.js'

export default function Register(Jenova)
{
    Jenova.Scene = Scene;
    Jenova.SceneManager = SceneManager;
    Jenova.Camera = Camera;
    Jenova.Renderer = Renderer;
    Jenova.Size = Size;
    Jenova.Time = Time;
    Jenova.Scroll = Scroll;
    Jenova.Wheel = Wheel;
    Jenova.Wire = Wire;
    Jenova.version = '0.0.1';
}
