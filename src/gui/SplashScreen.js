import path from 'path';
import { picture } from 'blessed-contrib';

export default function getSplashScreen(screen) {
  let size = screen.width > screen.height * 2 ? screen.height * 2 : screen.width,
    cols = size * 0.8;
  return picture({
    // remember we run the bundled code, put it relative to the bundle
    file: path.resolve(__dirname, '../assets/icon-100x100.png'),
    // top: 'center',
    // left: 'center',
    cols,
    screen,
    onReady: screen.splashScreenThenRender,
  });
}
