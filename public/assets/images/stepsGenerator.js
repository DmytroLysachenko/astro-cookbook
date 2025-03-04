/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from "fs";
import path from "path";

const cutting = {
  vegetables: {
    carrot: "cutting-vegetables-carrot.jpg",
    potato: "cutting-vegetables-potato.jpg",
    tomato: "cutting-vegetables-tomato.jpg",
    cucumber: "cutting-vegetables-cucumber.jpg",
    sweetPepper: "cutting-vegetables-sweetPepper.jpg",
    eggplant: "cutting-vegetables-eggplant.jpg",
    lettuce: "cutting-vegetables-lettuce.jpg",
  },
  meat: {
    red: {
      chops: "cutting-meat-red-chops.jpg",
      ribs: "cutting-meat-red-ribs.jpg",
      steak: "cutting-meat-red-steak.jpg",
    },
    poultry: {
      drumsticks: "cutting-meat-poultry-drumsticks.jpg",
      wings: "cutting-meat-poultry-wings.jpg",
      whole: "cutting-meat-poultry-whole.jpg",
      breasts: "cutting-meat-poultry-breasts.jpg",
    },
  },
  fish: {
    red: "cutting-fish-red.jpg",
    white: "cutting-fish-white.jpg",
    crab: "cutting-fish-crab.jpg",
    lobster: "cutting-fish-lobster.jpg",
    shrimps: "cutting-fish-shrimps.jpg",
    calamari: "cutting-fish-calamari.jpg",
  },
  fruits: {
    apple: "cutting-fruits-apple.jpg",
    pear: "cutting-fruits-pear.jpg",
    banana: "cutting-fruits-banana.jpg",
    citrus: "cutting-fruits-citrus.jpg",
    berries: {
      blueberry: "cutting-fruits-berries-blueberry.jpg",
      raspberry: "cutting-fruits-berries-raspberry.jpg",
      strawberry: "cutting-fruits-berries-strawberry.jpg",
      blackberry: "cutting-fruits-berries-blackberry.jpg",
    },
    pineapple: "cutting-fruits-pineapple.jpg",
    melon: "cutting-fruits-melon.jpg",
    peach: "cutting-fruits-peach.jpg",
    watermelon: "cutting-fruits-watermelon.jpg",
  },
  cheese: {
    yellow: "cutting-cheese-yellow.jpg",
    white: "cutting-cheese-white.jpg",
  },
  bread: {
    long: "cutting-bread-long.jpg",
    round: "cutting-bread-round.jpg",
    flat: "cutting-bread-flat.jpg",
  },
};

const boiling = {
  soup: {
    red: "boiling-soup-red.jpg",
    white: "boiling-soup-white.jpg",
    clear: "boiling-soup-clear.jpg",
  },
  pasta: {
    long: "boiling-pasta-long.jpg",
    short: "boiling-pasta-short.jpg",
    stuffed: "boiling-pasta-stuffed.jpg",
  },
  vegetables: "boiling-vegetables.jpg",
  grains: "boiling-grains.jpg",
  eggs: "boiling-eggs.jpg",
  seafood: {
    fish: "boiling-seafood-fish.jpg",
    shrimps: "boiling-seafood-shrimps.jpg",
    crab: "boiling-seafood-crab.jpg",
    mussels: "boiling-seafood-mussels.jpg",
  },
  dumplings: "boiling-dumplings.jpg",
};

const mixing = {
  bowl: {
    vegetables: {
      salad: "mixing-bowl-vegetables-salad.jpg",
      stirFry: "mixing-bowl-vegetables-stirFry.jpg",
    },
    fruits: {
      fruitSalad: "mixing-bowl-fruits-fruitSalad.jpg",
      smoothie: "mixing-bowl-fruits-smoothie.jpg",
    },
    liquids: {
      red: "mixing-bowl-liquids-red.jpg",
      white: "mixing-bowl-liquids-white.jpg",
      curry: "mixing-bowl-liquids-curry.jpg",
      broth: "mixing-bowl-liquids-broth.jpg",
      batter: "mixing-bowl-liquids-batter.jpg",
      marinade: "mixing-bowl-liquids-marinade.jpg",
    },
  },
  dough: {
    white: "mixing-dough-white.jpg",
    ryeDough: "mixing-dough-ryeDough.jpg",
    yellowDough: "mixing-dough-yellowDough.jpg",
  },
  mixer: {
    white: "mixing-mixer-white.jpg",
    red: "mixing-mixer-red.jpg",
    green: "mixing-mixer-green.jpg",
    curry: "mixing-mixer-curry.jpg",
  },
};

const frying = {
  pan: {
    meat: {
      red: {
        steak: "frying-pan-meat-red-steak.jpg",
        chops: "frying-pan-meat-red-chops.jpg",
        ribs: "frying-pan-meat-red-ribs.jpg",
        cubes: "frying-pan-meat-red-cubes.jpg",
      },
      poultry: {
        cubes: "frying-pan-meat-poultry-cubes.jpg",
        breast: "frying-pan-meat-poultry-breast.jpg",
        wings: "frying-pan-meat-poultry-wings.jpg",
        drumsticks: "frying-pan-meat-poultry-drumsticks.jpg",
      },
    },
    fish: {
      white: "frying-pan-fish-white.jpg",
      red: "frying-pan-fish-red.jpg",
      crab: "frying-pan-fish-crab.jpg",
      lobster: "frying-pan-fish-lobster.jpg",
      shrimps: "frying-pan-fish-shrimps.jpg",
    },
    vegetables: {
      onions: "frying-pan-vegetables-onions.jpg",
      green: "frying-pan-vegetables-green.jpg",
      mushrooms: "frying-pan-vegetables-mushrooms.jpg",
      potatoes: "frying-pan-vegetables-potatoes.jpg",
      carrots: "frying-pan-vegetables-carrots.jpg",
    },
    mix: {
      vegetableMix: "frying-pan-mix-vegetableMix.jpg",
      meatVegetables: "frying-pan-mix-meatVegetables.jpg",
      chickenVegetables: "frying-pan-mix-chickenVegetables.jpg",
      fishVegetables: "frying-pan-mix-fishVegetables.jpg",
    },
    eggs: "frying-pan-eggs.jpg",
    dumplings: "frying-pan-dumplings.jpg",
  },
  deep: {
    fish: "frying-deep-fish.jpg",
    meat: {
      poultry: {
        wings: "frying-deep-meat-poultry-wings.jpg",
        nuggets: "frying-deep-meat-poultry-nuggets.jpg",
        breast: "frying-deep-meat-poultry-breast.jpg",
      },
      red: {
        chops: "frying-deep-meat-red-chops.jpg",
        belly: "frying-deep-meat-red-belly.jpg",
      },
    },
    vegetables: {
      fries: "frying-deep-vegetables-fries.jpg",
      tempura: "frying-deep-vegetables-tempura.jpg",
    },
  },
};

const grilling = {
  meat: {
    red: {
      steak: "grilling-meat-red-steak.jpg",
      burgers: "grilling-meat-red-burgers.jpg",
      ribs: "grilling-meat-red-ribs.jpg",
    },
    poultry: {
      breast: "grilling-meat-poultry-breast.jpg",
      thighs: "grilling-meat-poultry-thighs.jpg",
      wings: "grilling-meat-poultry-wings.jpg",
      drumsticks: "grilling-meat-poultry-drumsticks.jpg",
    },
  },
  vegetables: {
    corn: "grilling-vegetables-corn.jpg",
    peppers: "grilling-vegetables-peppers.jpg",
    onions: "grilling-vegetables-onions.jpg",
    tomatoes: "grilling-vegetables-tomatoes.jpg",
    mix: "grilling-vegetables-mix.jpg",
  },
  fish: {
    red: "grilling-fish-red.jpg",
    white: "grilling-fish-white.jpg",
    shrimp: "grilling-fish-shrimp.jpg",
    calamari: "grilling-fish-calamari.jpg",
  },
  skewers: {
    meat: "grilling-skewers-meat.jpg",
    veggie: "grilling-skewers-veggie.jpg",
    mixed: "grilling-skewers-mixed.jpg",
  },
  halloumi: "grilling-halloumi.jpg",
};

const baking = {
  oven: {
    bread: {
      loaf: "baking-oven-bread-loaf.jpg",
      baguette: "baking-oven-bread-baguette.jpg",
      rolls: "baking-oven-bread-rolls.jpg",
    },
    dessert: {
      cake: {
        chocolate: "baking-oven-dessert-cake-chocolate.jpg",
        vanilla: "baking-oven-dessert-cake-vanilla.jpg",
        cheesecake: "baking-oven-dessert-cake-cheesecake.jpg",
      },
      cookies: "baking-oven-dessert-cookies.jpg",
      brownies: "baking-oven-dessert-brownies.jpg",
    },
    savory: {
      quiche: "baking-oven-savory-quiche.jpg",
      casserole: "baking-oven-savory-casserole.jpg",
      lasagna: "baking-oven-savory-lasagna.jpg",
    },
  },
  pastry: {
    pie: "baking-pastry-pie.jpg",
    tart: {
      fruit: "baking-pastry-tart-fruit.jpg",
      chocolate: "baking-pastry-tart-chocolate.jpg",
      savory: "baking-pastry-tart-savory.jpg",
    },
    puffPastry: {
      croissant: "baking-pastry-puffPastry-croissant.jpg",
      palmier: "baking-pastry-puffPastry-palmier.jpg",
      volAuVent: "baking-pastry-puffPastry-volAuVent.jpg",
    },
  },
};

const roasting = {
  oven: {
    meat: {
      chicken: "roasting-oven-meat-chicken.jpg",
      drumsticks: "roasting-oven-meat-drumsticks.jpg",
      loaf: "roasting-oven-meat-loaf.jpg",
      white: "roasting-oven-meat-white.jpg",
      red: "roasting-oven-meat-red.jpg",
    },
    fish: {
      red: "roasting-oven-fish-red.jpg",
      white: "roasting-oven-fish-white.jpg",
      crab: "roasting-oven-fish-crab.jpg",
      lobster: "roasting-oven-fish-lobster.jpg",
      shrimps: "roasting-oven-fish-shrimps.jpg",
    },
    vegetablesMix: "roasting-oven-vegetablesMix.jpg",
  },
};

const steaming = {
  vegetables: {
    green: "steaming-vegetables-green.jpg",
    potatoes: "steaming-vegetables-potatoes.jpg",
    carrots: "steaming-vegetables-carrots.jpg",
  },
  meat: {
    chicken: "steaming-meat-chicken.jpg",
    drumsticks: "steaming-meat-drumsticks.jpg",
    red: "steaming-meat-red.jpg",
    white: "steaming-meat-white.jpg",
  },
  fish: {
    red: "steaming-fish-red.jpg",
    white: "steaming-fish-white.jpg",
    crab: "steaming-fish-crab.jpg",
    lobster: "steaming-fish-lobster.jpg",
    shrimps: "steaming-fish-shrimps.jpg",
  },
  dumplings: "steaming-dumplings.jpg",
  rice: "steaming-rice.jpg",
};

const seasoning = {
  herbs: "seasoning-herbs.jpg",
  spices: {
    curry: "seasoning-spices-curry.jpg",
    black: "seasoning-spices-black.jpg",
    paprika: "seasoning-spices-paprika.jpg",
    white: "seasoning-spices-white.jpg",
  },
};

const stirring = {
  soupPot: {
    red: "stirring-soupPot-red.jpg",
    white: "stirring-soupPot-white.jpg",
    green: "stirring-soupPot-green.jpg",
  },
  saucePan: {
    tomato: "stirring-saucePan-tomato.jpg",
    cream: "stirring-saucePan-cream.jpg",
    green: "stirring-saucePan-green.jpg",
  },
  pan: {
    vegetables: "stirring-pan-vegetables.jpg",
    meat: {
      red: "stirring-pan-meat-red.jpg",
      white: "stirring-pan-meat-white.jpg",
      vegetableMeat: "stirring-pan-meat-vegetableMeat.jpg",
      pastaMeat: "stirring-pan-meat-pastaMeat.jpg",
      riceMeat: "stirring-pan-meat-riceMeat.jpg",
    },
    fish: {
      fish: "stirring-pan-fish-fish.jpg",
      vegetableFish: "stirring-pan-fish-vegetableFish.jpg",
      pastaFish: "stirring-pan-fish-pastaFish.jpg",
      riceFish: "stirring-pan-fish-riceFish.jpg",
    },
    dumplings: "stirring-pan-dumplings.jpg",
    pasta: "stirring-pan-pasta.jpg",
    rice: "stirring-pan-rice.jpg",
  },
};

const stewing = {
  meat: {
    red: "stewing-meat-red.jpg",
    white: "stewing-meat-white.jpg",
  },
  fish: {
    red: "stewing-fish-red.jpg",
    white: "stewing-fish-white.jpg",
    shrimp: "stewing-fish-shrimp.jpg",
    calamari: "stewing-fish-calamari.jpg",
  },
  vegetables: {
    potato: "stewing-vegetables-potato.jpg",
    mix: "stewing-vegetables-mix.jpg",
  },
};

const tendering = {
  meat: {
    red: "tendering-meat-red.jpg",
    white: "tendering-meat-white.jpg",
    chicken: "tendering-meat-chicken.jpg",
  },
  fish: {
    red: "tendering-fish-red.jpg",
    white: "tendering-fish-white.jpg",
  },
};

const waiting = {
  dough: {
    rising: "waiting-dough-rising.jpg",
    proofing: "waiting-dough-proofing.jpg",
  },
  marinating: {
    meat: {
      red: "waiting-marinating-meat-red.jpg",
      white: "waiting-marinating-meat-white.jpg",
      chicken: "waiting-marinating-meat-chicken.jpg",
    },
    fish: "waiting-marinating-fish.jpg",
  },
};

const kitchenAppliances = {
  microwave: "kitchenAppliances-microwave.jpg",
  blender: "kitchenAppliances-blender.jpg",
  multiCooker: "kitchenAppliances-multiCooker.jpg",
};

const steps = {
  cutting,
  boiling,
  mixing,
  frying,
  grilling,
  baking,
  roasting,
  steaming,
  seasoning,
  stirring,
  stewing,
  tendering,
  waiting,
  kitchenAppliances,
};

// Function to create folders and files recursively
function createFolders(obj, currentPath) {
  for (const key in obj) {
    const newPath = path.join(currentPath, key);

    if (typeof obj[key] === "object") {
      // Create folder if it doesn't exist
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
        console.log(`Created folder: ${newPath}`);
      }

      // Recursively create subfolders and files
      createFolders(obj[key], newPath);
    } else {
      // Create file if it doesn't exist
      const filePath = path.join(currentPath, obj[key]);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "");
        console.log(`Created file: ${filePath}`);
      }
    }
  }
}

// createFolders(steps, "./steps");

// Function to generate AI prompts for images
function generatePrompts(obj, currentPath, promptFilePath, action = "") {
  for (const key in obj) {
    const newPath = path.join(currentPath, key);

    if (typeof obj[key] === "object") {
      // Recursively generate prompts for nested objects
      // Pass the current action or update it if this is a new action (e.g., cutting, boiling)
      const newAction = action || key; // Use the current action if available, otherwise use the key
      generatePrompts(obj[key], newPath, promptFilePath, newAction);
    } else {
      // Generate AI prompt for the image
      const subject = key.replace(".jpg", ""); // Get the subject (e.g., carrot, steak)
      const prompt = `Image in WikiHow style, designed for cooking guidance on a recipes website. 
The image should clearly depict the action of [${action}] with [${subject}], in a simple and clean kitchen environment. 
Avoid overly detailed or specific visuals, focusing instead on a generalized representation that can be reused across multiple recipes. 
The image should be versatile, with a neutral background and minimal distractions, ensuring it fits seamlessly into various step-by-step instructions. 
The goal is to create a clear, reusable visual that enhances user understanding without being recipe-specific.
`;

      // Append the prompt to the prompts file
      fs.appendFileSync(
        promptFilePath,
        `File: ${newPath}/${obj[key]}\nPrompt: ${prompt}\n\n`,
      );
    }
  }
}

// Define the base path (for reference, not for folder creation)
const basePath = "public/assets/images/steps";

// Define the path for the prompts file
const promptFilePath = path.join("./", "prompts.txt");

// Initialize the prompts file (clear existing content if any)
fs.writeFileSync(promptFilePath, "AI Prompts for Cooking Images:\n\n");

// Call the function with the steps object, base path, and prompts file path
generatePrompts(steps, basePath, promptFilePath);

console.log("Prompts generated and saved to prompts.txt successfully.");
