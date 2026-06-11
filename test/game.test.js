/*
 * Standalone test for Dragon Repeller game logic.
 *
 * The game was written for the browser and reads DOM globals at load time
 * (document.querySelector, element.onclick, innerText). To exercise the real
 * shipped script.js without a browser, we install a tiny DOM stub on the
 * global scope, load script.js into this context, then call the game's own
 * functions and assert on game state.
 *
 * Run: node test/game.test.js   (no dependencies, Node 18+)
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

let failures = 0;
function assert(cond, msg) {
  if (cond) {
    console.log("  PASS: " + msg);
  } else {
    console.error("  FAIL: " + msg);
    failures++;
  }
}

// Minimal DOM stub: every element is a plain object with innerText, onclick,
// and a style object. querySelector returns a fresh stub per id and caches it.
function makeDom() {
  const elements = {};
  function el() {
    return { innerText: "", onclick: null, style: {} };
  }
  return {
    querySelector(selector) {
      const id = selector.replace(/^#/, "");
      if (!elements[id]) elements[id] = el();
      return elements[id];
    },
    _elements: elements
  };
}

// Load script.js into a sandboxed context with the DOM stub, then expose its
// top-level functions and let-bindings back out for assertions.
function loadGame() {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "script.js"),
    "utf8"
  );
  const document = makeDom();
  // Append exports so we can read game internals after load.
  const exposed = [
    "attack", "getMonsterAttackValue", "restart", "pick",
    "fightDragon", "fightSlime", "goFight", "buyHealth"
  ];
  const reads = ["health", "monsterHealth", "xp", "gold", "fighting", "monsterHealthText", "healthText"];
  const wrapper =
    code +
    "\n;globalThis.__game = { " +
    exposed.map((n) => n + ": " + n).join(", ") +
    ", get health(){return health}, set health(v){health=v}" +
    ", get monsterHealth(){return monsterHealth}, set monsterHealth(v){monsterHealth=v}" +
    ", get xp(){return xp}, set xp(v){xp=v}" +
    ", get gold(){return gold}, set gold(v){gold=v}" +
    ", healthText: healthText, monsterHealthText: monsterHealthText };";
  const sandbox = { document, console, Math, globalThis: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(wrapper, sandbox);
  return sandbox.globalThis.__game;
}

console.log("getMonsterAttackValue clamp");
{
  const g = loadGame();
  // With high XP the raw formula (level*5 - rand(xp)) can go negative.
  // The clamp must keep it at 0 so attack() never heals the player.
  g.xp = 200;
  let everNegative = false;
  for (let i = 0; i < 500; i++) {
    const v = g.getMonsterAttackValue(20); // dragon level 20
    if (v < 0) everNegative = true;
  }
  assert(!everNegative, "monster attack value is never negative even at high XP");

  // With no XP, value is deterministic: level*5.
  g.xp = 0;
  assert(g.getMonsterAttackValue(2) === 10, "slime (level 2) deals 10 with 0 XP");
}

console.log("attack() never heals the player on a landed hit");
{
  const g = loadGame();
  g.xp = 500;          // very high XP -> raw formula very negative
  g.fightDragon();     // sets fighting = 2, monsterHealth = 300
  const before = g.health;
  // Run many attacks; health must never increase from a monster hit.
  let maxHealth = before;
  for (let i = 0; i < 200 && g.health > 0; i++) {
    if (g.monsterHealth <= 0) g.monsterHealth = 300; // keep fight alive
    g.attack();
    if (g.health > maxHealth) maxHealth = g.health;
  }
  assert(maxHealth <= before, "player health never rises above starting value during a fight");
}

console.log("displayed health/monsterHealth are clamped at 0");
{
  const g = loadGame();
  g.fightSlime();        // fighting = 0
  g.health = 5;
  g.monsterHealth = 3;
  g.xp = 0;
  // Force a lethal exchange a few times; the rendered text must not be negative.
  for (let i = 0; i < 50; i++) {
    g.attack();
    const h = Number(g.healthText.innerText);
    const m = Number(g.monsterHealthText.innerText);
    assert(h >= 0, "rendered player health stays >= 0 (got " + h + ")");
    assert(m >= 0, "rendered monster health stays >= 0 (got " + m + ")");
    if (g.health <= 0) break;
  }
}

console.log("restart() resets core stats");
{
  const g = loadGame();
  g.xp = 99;
  g.gold = 0;
  g.health = 1;
  g.restart();
  assert(g.xp === 0, "xp reset to 0");
  assert(g.gold === 50, "gold reset to 50");
  assert(g.health === 100, "health reset to 100");
}

if (failures > 0) {
  console.error("\n" + failures + " assertion(s) failed.");
  process.exit(1);
}
console.log("\nAll tests passed.");
