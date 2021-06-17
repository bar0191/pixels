import '../styles/main.css';
import { World } from './World/World.js';

// create the main function
async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');
  const element = document.querySelector('.bounding-gl');

  // create a new world
  const world = new World(container, element);

  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();
}

// call main to start the app
main().catch((err) => {
  console.error(err);
});