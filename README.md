![Epic Boy vs Dragon Fantasy Digital Art Poster](https://github.com/user-attachments/assets/1f92b9d2-125d-45b6-a3c9-135a781f4e25)

# RPG - Dragon Repeller

**Dragon Repeller** is a text-based RPG game developed using HTML, CSS, and JavaScript. As the player, you must defeat a series of monsters to save the town from the dreaded dragon that prevents the townspeople from leaving. This project is inspired by a FreeCodeCamp exercise and is a fun example of creating interactive web games.

A big thanks to [freeCodeCamp.org](https://www.freecodecamp.org/) for their fantastic guidance through the step-by-step YouTube course, "[Full Stack Web Development for Beginners (Full Course on HTML, CSS, JavaScript, Node.js, MongoDB)](https://www.youtube.com/watch?v=nu_pCVPKzTk&list=PLWKjhJtqVAbn21gs5UnLhCQ82f923WCgM&index=15)." Their resources made this project possible!


## Table of Contents
- [Features](#features)
- [Gameplay Overview](#gameplay-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Gameplay**: Navigate between locations, make decisions, and fight monsters.
- **Player Stats**: Track your experience points (XP), health, and gold throughout the game.
- **Inventory Management**: Buy weapons to increase attack power and use them in battles.
- **Combat System**: Fight various monsters with different levels and health points, including a final boss battle against a dragon.
- **Easter Egg**: Discover a hidden mini-game that can reward or penalize you based on your luck.
- **Replayability**: Lose or win the game and replay it for a different experience.

## Gameplay Overview

In *Dragon Repeller*, you start in the town square with 100 health, 50 gold, and a basic weapon. Using the buttons, you can navigate to different areas:
- **Town Square**: The central hub where you can decide where to go next.
- **Store**: Buy health or upgrade your weapon for increased power.
- **Cave**: Engage in battles with monsters to earn XP and gold.
  
Your goal is to defeat the dragon to win the game. Along the way, you’ll encounter various monsters, each with unique abilities and health levels.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Caio-Felice-Cunha/Dragon-Repeller-Game.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Dragon-Repeller-Game
   ```

3. **Launch the game**:
   - Open `index.html` directly in your web browser. There is no build step and no dependencies.
   - Optionally, serve the folder with any static server, for example `python -m http.server` and then open `http://localhost:8000`.

## Usage

### Controls
- **Three buttons**: The game is driven entirely by three buttons. They do not have fixed roles. Each location reassigns all three, and the button's current action is always shown on its label.
  - In the **town square** the buttons are: Go to Store, Go to Cave, Fight Dragon.
  - In the **store** they become: Buy 10 health, Buy weapon, Go to town square.
  - During a **fight** they become: attack, dodge, run.
  - Always read the label to know what a button does in the current location.

### Game Mechanics
- **Upgrading Weapons**: Purchase weapons with gold to increase attack power. Weapons can break occasionally, adding an element of strategy.
- **Fighting Monsters**: Battle progressively difficult monsters and try to survive until the final battle with the dragon.
- **Easter Egg**: Discover a hidden game within the game for additional rewards.

## Running the Tests

The combat logic has a small test suite that runs in Node (version 18 or newer) with no external dependencies. It loads the real `script.js` against a minimal DOM stub and checks the core behavior, including the monster-attack clamp that stops a high-XP player from being healed on a hit.

```bash
npm test
# or, without npm:
node test/game.test.js
```

## Project Structure

Here is an overview of the main files:

```plaintext
Dragon-Repeller-Game/
│
├── index.html        # The main HTML file containing the game layout.
├── style.css         # CSS file for styling the game elements.
├── script.js         # JavaScript file that controls the game logic.
├── package.json      # Test script entry point (no runtime dependencies).
└── test/
    └── game.test.js  # Node test suite for the core combat logic.
```

### `index.html`
Contains the structure of the game, including buttons for navigation, stats display, and game text output.

### `style.css`
Handles the visual appearance of the game. Customize this file to change the game’s theme or layout.

### `script.js`
Contains all the JavaScript code to handle player actions, update stats, and manage game state. Key functions include:
- `update(location)`: Changes the game state based on player actions.
- `goTown()`, `goStore()`, `goCave()`: Navigation functions to move between areas.
- `buyHealth()`, `buyWeapon()`: Manage player inventory and stats.
- `fightSlime()`, `fightBeast()`, `fightDragon()`: Functions for battling different monsters.

## Technologies Used

- **HTML5**: For structuring the game layout.
- **CSS3**: For styling and enhancing the user interface.
- **JavaScript**: The core programming language used to build game functionality.

## Contributing

If you'd like to contribute to the development of **Dragon Repeller**, feel free to follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -m "Add feature"`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
