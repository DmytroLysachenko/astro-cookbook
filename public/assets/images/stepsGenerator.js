/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from "fs";
import path from "path";

const cutting = {
  vegetables: {
    carrot: "steps/cutting/vegetables/cutting-vegetables-carrot.jpg",
    potato: "steps/cutting/vegetables/cutting-vegetables-potato.jpg",
    tomato: "steps/cutting/vegetables/cutting-vegetables-tomato.jpg",
    cucumber: "steps/cutting/vegetables/cutting-vegetables-cucumber.jpg",
    sweetPepper: "steps/cutting/vegetables/cutting-vegetables-sweetPepper.jpg",
    eggplant: "steps/cutting/vegetables/cutting-vegetables-eggplant.jpg",
    lettuce: "steps/cutting/vegetables/cutting-vegetables-lettuce.jpg",
    onion: "steps/cutting/vegetables/cutting-vegetables-onion.jpg",
    radish: "steps/cutting/vegetables/cutting-vegetables-radish.jpg",
    mix: {
      tomatoCauliflower:
        "steps/cutting/vegetables/cutting-vegetables-mix-tomato-califlower.jpg",
      tomatoEggplantCarrot:
        "steps/cutting/vegetables/cutting-vegetables-mix-tomato-eggplnt-carrot.jpg",
      tomatoOnionGreen:
        "steps/cutting/vegetables/cutting-vegetables-mix-tomato-onion-green.jpg",
    },
  },
  meat: {
    red: {
      chops: "steps/cutting/meat/red/cutting-meat-red-chops.jpg",
      ribs: "steps/cutting/meat/red/cutting-meat-red-ribs.jpg",
      steak: "steps/cutting/meat/red/cutting-meat-red-steak.jpg",
      cubes: "steps/cutting/meat/red/cutting-meat-red-cubes.jpg",
    },
    poultry: {
      drumsticks:
        "steps/cutting/meat/poultry/cutting-meat-poultry-drumsticks.jpg",
      wings: "steps/cutting/meat/poultry/cutting-meat-poultry-wings.jpg",
      whole: "steps/cutting/meat/poultry/cutting-meat-poultry-whole.jpg",
      breasts: "steps/cutting/meat/poultry/cutting-meat-poultry-breasts.jpg",
      pieces: "steps/cutting/meat/poultry/cutting-meat-poultry-pieces.jpg",
    },
  },
  fish: {
    red: {
      whole: "steps/cutting/fish/cutting-fish-red-whole.jpg",
      fillet: "steps/cutting/fish/cutting-fish-red.jpg",
    },
    white: {
      whole: "steps/cutting/fish/cutting-fish-white-whole.jpg",
      fillet: "steps/cutting/fish/cutting-fish-white.jpg",
    },
    crab: "steps/cutting/fish/cutting-fish-crab.jpg",
    lobster: "steps/cutting/fish/cutting-fish-lobster.jpg",
    shrimps: "steps/cutting/fish/cutting-fish-shrimps.jpg",
    calamari: "steps/cutting/fish/cutting-fish-calamari.jpg",
    pink: "steps/cutting/fish/cutting-fish-pink.jpg",
  },
  fruits: {
    apple: "steps/cutting/fruits/cutting-fruits-apple.jpg",
    pear: "steps/cutting/fruits/cutting-fruits-pear.jpg",
    banana: "steps/cutting/fruits/cutting-fruits-banana.jpg",
    citrus: {
      orange: "steps/cutting/fruits/cutting-fruits-citrus-orange.jpg",
      red: "steps/cutting/fruits/cutting-fruits-citrus-red.jpg",
    },
    berries: {
      blueberry:
        "steps/cutting/fruits/berries/cutting-fruits-berries-blueberry.jpg",
      raspberry:
        "steps/cutting/fruits/berries/cutting-fruits-berries-raspberry.jpg",
      strawberry:
        "steps/cutting/fruits/berries/cutting-fruits-berries-strawberry.jpg",
      blackberry:
        "steps/cutting/fruits/berries/cutting-fruits-berries-blackberry.jpg",
    },
    pineapple: "steps/cutting/fruits/cutting-fruits-pineapple.jpg",
    melon: "steps/cutting/fruits/cutting-fruits-melon.jpg",
    peach: "steps/cutting/fruits/cutting-fruits-peach.jpg",
    watermelon: "steps/cutting/fruits/cutting-fruits-watermelon.jpg",
  },
  cheese: {
    yellow: "steps/cutting/cheese/cutting-cheese-yellow.jpg",
    white: "steps/cutting/cheese/cutting-cheese-white.jpg",
  },
  bread: {
    long: "steps/cutting/bread/cutting-bread-long.jpg",
    round: "steps/cutting/bread/cutting-bread-round.jpg",
    flat: "steps/cutting/bread/cutting-bread-flat.jpg",
    buns: "steps/cutting/bread/cutting-bread-buns.jpg",
  },
};

const boiling = {
  soup: {
    red: "steps/boiling/soup/boiling-soup-red.jpg",
    white: "steps/boiling/soup/boiling-soup-white.jpg",
    clear: "steps/boiling/soup/boiling-soup-clear.jpg",
    brothVeggies: "steps/boiling/soup/boiling-soup-broth-veggies.jpg",
    curryVeggies: "steps/boiling/soup/boiling-soup-curry-veggies.jpg",
    curry: "steps/boiling/soup/boiling-soup-curry.jpg",
    greenVeggies: "steps/boiling/soup/boiling-soup-green-veggies.jpg",
    green: "steps/boiling/soup/boiling-soup-green.jpg",
    redVeggies: "steps/boiling/soup/boiling-soup-red-veggies.jpg",
    whiteVeggies: "steps/boiling/soup/boiling-soup-white-veggies.jpg",
  },
  pasta: {
    long: "steps/boiling/pasta/boiling-pasta-long.jpg",
    short: "steps/boiling/pasta/boiling-pasta-short.jpg",
    stuffed: "steps/boiling/pasta/boiling-pasta-stuffed.jpg",
  },
  seafood: {
    fish: "steps/boiling/seafood/boiling-seafood-fish.jpg",
    shrimps: "steps/boiling/seafood/boiling-seafood-shrimps.jpg",
    crab: "steps/boiling/seafood/boiling-seafood-crab.jpg",
    mussels: "steps/boiling/seafood/boiling-seafood-mussels.jpg",
  },
  dumplings: {
    chinkali: "steps/boiling/boiling-dumplings-chinkali.jpg",
    pierogi: "steps/boiling/boiling-dumplings-pierogi.jpg",
  },
  eggs: "steps/boiling/boiling-eggs.jpg",
  grains: {
    buckwheat: "steps/boiling/boiling-grains-buckwheat.jpg",
    rice: "steps/boiling/boiling-grains-rice.jpg",
    general: "steps/boiling/boiling-grains.jpg",
  },
  vegetables: {
    green: "steps/boiling/boiling-vegetables-green.jpg",
    mix: "steps/boiling/boiling-vegetables-mix.jpg",
    red: "steps/boiling/boiling-vegetables-red.jpg",
  },
};

const mixing = {
  bowl: {
    vegetables: {
      salad: "steps/mixing/bowl/vegetables/mixing-bowl-vegetables-salad.jpg",
      stirFry:
        "steps/mixing/bowl/vegetables/mixing-bowl-vegetables-stirFry.jpg",
    },
    fruits: {
      fruitSalad: "steps/mixing/bowl/fruits/mixing-bowl-fruits-fruitSalad.jpg",
      smoothie: "steps/mixing/bowl/fruits/mixing-bowl-fruits-smoothie.jpg",
    },
    liquids: {
      red: "steps/mixing/bowl/liquids/mixing-bowl-liquids-red.jpg",
      white: "steps/mixing/bowl/liquids/mixing-bowl-liquids-white.jpg",
      curry: "steps/mixing/bowl/liquids/mixing-bowl-liquids-curry.jpg",
      broth: "steps/mixing/bowl/liquids/mixing-bowl-liquids-broth.jpg",
      batter: "steps/mixing/bowl/liquids/mixing-bowl-liquids-batter.jpg",
      marinade: "steps/mixing/bowl/liquids/mixing-bowl-liquids-marinade.jpg",
    },
  },
  dough: {
    white: "steps/mixing/dough/mixing-dough-white.jpg",
    ryeDough: "steps/mixing/dough/mixing-dough-ryeDough.jpg",
    yellowDough: "steps/mixing/dough/mixing-dough-yellowDough.jpg",
  },
  mixer: {
    white: "steps/mixing/mixer/mixing-mixer-white.jpg",
    red: "steps/mixing/mixer/mixing-mixer-red.jpg",
    green: "steps/mixing/mixer/mixing-mixer-green.jpg",
    curry: "steps/mixing/mixer/mixing-mixer-curry.jpg",
  },
};

const frying = {
  pan: {
    meat: {
      red: {
        steak: "steps/frying/pan/meat/red/frying-pan-meat-red-steak.jpg",
        chops: "steps/frying/pan/meat/red/frying-pan-meat-red-chops.jpg",
        ribs: "steps/frying/pan/meat/red/frying-pan-meat-red-ribs.jpg",
        cubes: "steps/frying/pan/meat/red/frying-pan-meat-red-cubes.jpg",
        burgers: "steps/frying/pan/meat/red/frying-pan-meat-red-burgers.jpg",
        withVeggies:
          "steps/frying/pan/meat/red/frying-pan-meat-red-with-veggies.jpg",
      },
      poultry: {
        cubes:
          "steps/frying/pan/meat/poultry/frying-pan-meat-poultry-cubes.jpg",
        breast:
          "steps/frying/pan/meat/poultry/frying-pan-meat-poultry-breast.jpg",
        wings:
          "steps/frying/pan/meat/poultry/frying-pan-meat-poultry-wings.jpg",
        drumsticks:
          "steps/frying/pan/meat/poultry/frying-pan-meat-poultry-drumsticks.jpg",
        withVeggies:
          "steps/frying/pan/meat/poultry/frying-pan-meat-poultry-with-veggies.jpg",
      },
    },
    fish: {
      red: {
        withVeggies:
          "steps/frying/pan/fish/red/frying-pan-fish-red-with-veggies.jpg",
        fillet: "steps/frying/pan/fish/red/frying-pan-fish-red.jpg",
      },
      white: {
        withVeggies:
          "steps/frying/pan/fish/white/frying-pan-fish-white-with-veggies.jpg",
        fillet: "steps/frying/pan/fish/white/frying-pan-fish-white.jpg",
      },
      crab: "steps/frying/pan/fish/frying-pan-fish-crab.jpg",
      lobster: "steps/frying/pan/fish/frying-pan-fish-lobster.jpg",
      shrimps: "steps/frying/pan/fish/frying-pan-fish-shrimps.jpg",
      cubes: "steps/frying/pan/fish/frying-pan-fish-cubes.jpg",
    },
    vegetables: {
      onions: "steps/frying/pan/vegetables/frying-pan-vegetables-onions.jpg",
      green: "steps/frying/pan/vegetables/frying-pan-vegetables-green.jpg",
      mushrooms:
        "steps/frying/pan/vegetables/frying-pan-vegetables-mushrooms.jpg",
      potatoes:
        "steps/frying/pan/vegetables/frying-pan-vegetables-potatoes.jpg",
      carrots: "steps/frying/pan/vegetables/frying-pan-vegetables-carrots.jpg",
      mix: "steps/frying/pan/vegetables/frying-pan-mix-vegetableMix.jpg",
    },
    eggs: "steps/frying/pan/frying-pan-eggs.jpg",
    dumplings: "steps/frying/pan/frying-pan-dumplings.jpg",
    substance: {
      creamy: "steps/frying/pan/substance/frying-pan-substance-creamy.jpg",
      curry: "steps/frying/pan/substance/frying-pan-substance-curry.jpg",
      red: "steps/frying/pan/substance/frying-pan-substance-red.jpg",
    },
  },
  deep: {
    fish: "steps/frying/deep/frying-deep-fish.jpg",
    meat: {
      poultry: {
        wings:
          "steps/frying/deep/meat/poultry/frying-deep-meat-poultry-wings.jpg",
        nuggets:
          "steps/frying/deep/meat/poultry/frying-deep-meat-poultry-nuggets.jpg",
        breast:
          "steps/frying/deep/meat/poultry/frying-deep-meat-poultry-breast.jpg",
      },
      red: {
        chops: "steps/frying/deep/meat/red/frying-deep-meat-red-chops.jpg",
        belly: "steps/frying/deep/meat/red/frying-deep-meat-red-belly.jpg",
        cubes: "steps/frying/deep/meat/red/frying-deep-meat-red-cubes.jpg",
      },
    },
    vegetables: {
      fries: "steps/frying/deep/vegetables/frying-deep-vegetables-fries.jpg",
      tempura:
        "steps/frying/deep/vegetables/frying-deep-vegetables-tempura.jpg",
    },
    shrimps: "steps/frying/deep/frying-deep-shrimps.jpg",
  },
};

const grilling = {
  meat: {
    red: {
      steak: "steps/grilling/meat/red/grilling-meat-red-steak.jpg",
      burgers: "steps/grilling/meat/red/grilling-meat-red-burgers.jpg",
      ribs: "steps/grilling/meat/red/grilling-meat-red-ribs.jpg",
    },
    poultry: {
      breast: "steps/grilling/meat/poultry/grilling-meat-poultry-breast.jpg",
      thighs: "steps/grilling/meat/poultry/grilling-meat-poultry-thighs.jpg",
      wings: "steps/grilling/meat/poultry/grilling-meat-poultry-wings.jpg",
      drumsticks:
        "steps/grilling/meat/poultry/grilling-meat-poultry-drumsticks.jpg",
    },
  },
  vegetables: {
    corn: "steps/grilling/vegetables/grilling-vegetables-corn.jpg",
    peppers: "steps/grilling/vegetables/grilling-vegetables-peppers.jpg",
    onions: "steps/grilling/vegetables/grilling-vegetables-onions.jpg",
    tomatoes: "steps/grilling/vegetables/grilling-vegetables-tomatoes.jpg",
    mix: "steps/grilling/vegetables/grilling-vegetables-mix.jpg",
  },
  fish: {
    red: "steps/grilling/fish/grilling-fish-red.jpg",
    white: "steps/grilling/fish/grilling-fish-white.jpg",
    shrimp: "steps/grilling/fish/grilling-fish-shrimp.jpg",
    calamari: "steps/grilling/fish/grilling-fish-calamari.jpg",
  },
  skewers: {
    meat: "steps/grilling/skewers/grilling-skewers-meat.jpg",
    veggie: "steps/grilling/skewers/grilling-skewers-veggie.jpg",
    mixed: "steps/grilling/skewers/grilling-skewers-mixed.jpg",
  },
  halloumi: "steps/grilling/grilling-halloumi.jpg",
};

const baking = {
  oven: {
    bread: {
      loaf: "steps/baking/oven/bread/baking-oven-bread-loaf.jpg",
      baguette: "steps/baking/oven/bread/baking-oven-bread-baguette.jpg",
      rolls: "steps/baking/oven/bread/baking-oven-bread-rolls.jpg",
    },
    dessert: {
      cake: {
        chocolate:
          "steps/baking/oven/dessert/cake/baking-oven-dessert-cake-chocolate.jpg",
        vanilla:
          "steps/baking/oven/dessert/cake/baking-oven-dessert-cake-vanilla.jpg",
        cheesecake:
          "steps/baking/oven/dessert/cake/baking-oven-dessert-cake-cheesecake.jpg",
      },
      cookies: "steps/baking/oven/dessert/baking-oven-dessert-cookies.jpg",
      brownies: "steps/baking/oven/dessert/baking-oven-dessert-brownies.jpg",
    },
    savory: {
      quiche: "steps/baking/oven/savory/baking-oven-savory-quiche.jpg",
      casserole: "steps/baking/oven/savory/baking-oven-savory-casserole.jpg",
      lasagna: "steps/baking/oven/savory/baking-oven-savory-lasagna.jpg",
    },
  },
  pastry: {
    pie: "steps/baking/pastry/baking-pastry-pie.jpg",
    tart: {
      fruit: "steps/baking/pastry/tart/baking-pastry-tart-fruit.jpg",
      chocolate: "steps/baking/pastry/tart/baking-pastry-tart-chocolate.jpg",
      savory: "steps/baking/pastry/tart/baking-pastry-tart-savory.jpg",
    },
    puffPastry: {
      croissant:
        "steps/baking/pastry/puffPastry/baking-pastry-puffPastry-croissant.jpg",
      palmier:
        "steps/baking/pastry/puffPastry/baking-pastry-puffPastry-palmier.jpg",
      volAuVent:
        "steps/baking/pastry/puffPastry/baking-pastry-puffPastry-volAuVent.jpg",
    },
  },
};

const roasting = {
  oven: {
    meat: {
      chicken: {
        foil: "steps/roasting/oven/meat/chicken/roasting-oven-meat-chicken-foil.jpg",
        general:
          "steps/roasting/oven/meat/chicken/roasting-oven-meat-chicken.jpg",
      },
      drumsticks: {
        foil: "steps/roasting/oven/meat/drumsticks/roasting-oven-meat-drumsticks-foil.jpg",
        general:
          "steps/roasting/oven/meat/drumsticks/roasting-oven-meat-drumsticks.jpg",
      },
      loaf: {
        foil: "steps/roasting/oven/meat/loaf/roasting-oven-meat-loaf-foil.jpg",
        general: "steps/roasting/oven/meat/loaf/roasting-oven-meat-loaf.jpg",
      },
      red: {
        foil: "steps/roasting/oven/meat/red/roasting-oven-meat-red-foil.jpg",
        general: "steps/roasting/oven/meat/red/roasting-oven-meat-red.jpg",
      },
    },
    fish: {
      red: "steps/roasting/oven/fish/red/roasting-oven-fish-red.jpg",
      white: "steps/roasting/oven/fish/white/roasting-oven-fish-white.jpg",
      crab: "steps/roasting/oven/fish/crab/roasting-oven-fish-crab.jpg",
      lobster:
        "steps/roasting/oven/fish/lobster/roasting-oven-fish-lobster.jpg",
      shrimps:
        "steps/roasting/oven/fish/shrimps/roasting-oven-fish-shrimps.jpg",
      full: {
        foil: "steps/roasting/oven/fish/full/roasting-oven-fish-full-alumini-foil.jpg",
        general: "steps/roasting/oven/fish/full/roasting-oven-fish-full.jpg",
      },
    },
    vegetablesMix: "steps/roasting/oven/roasting-oven-vegetablesMix.jpg",
  },
};

const steaming = {
  vegetables: {
    green: "steps/steaming/vegetables/steaming-vegetables-green.jpg",
    potatoes: "steps/steaming/vegetables/steaming-vegetables-potatoes.jpg",
    carrots: "steps/steaming/vegetables/steaming-vegetables-carrots.jpg",
    broccoli: "steps/steaming/vegetables/steaming-vegetables-brocolli.jpg",
    cauliflower: "steps/steaming/vegetables/steaming-vegetables-califlower.jpg",
    mix: "steps/steaming/vegetables/steaming-vegetables-mix.jpg",
  },
  meat: {
    chicken: "steps/steaming/meat/steaming-meat-chicken.jpg",
    drumsticks: "steps/steaming/meat/steaming-meat-drumsticks.jpg",
    red: {
      cubes: "steps/steaming/meat/red/steaming-meat-red-cubes.jpg",
      steak: "steps/steaming/meat/red/steaming-meat-red-steak.jpg",
    },
  },
  fish: {
    red: "steps/steaming/fish/red/steaming-fish-red.jpg",
    white: "steps/steaming/fish/white/steaming-fish-white.jpg",
    crab: "steps/steaming/fish/crab/steaming-fish-crab.jpg",
    lobster: "steps/steaming/fish/lobster/steaming-fish-lobster.jpg",
    shrimps: "steps/steaming/fish/shrimps/steaming-fish-shrimps.jpg",
  },
  dumplings: {
    chinkali: "steps/steaming/steaming-dumplings-chinkali.jpg",
    pierogi: "steps/steaming/steaming-pierogi.jpg",
  },
  grain: "steps/steaming/steaming-grain.jpg",
  rice: "steps/steaming/steaming-rice.jpg",
};

const seasoning = {
  herbs: "steps/seasoning/seasoning-herbs.jpg",
  spices: {
    black: "steps/seasoning/seasoning-spices-black.jpg",
    curry: "steps/seasoning/seasoning-spices-curry.jpg",
    green: "steps/seasoning/seasoning-spices-green.jpg",
    mix: "steps/seasoning/seasoning-spices-mix.jpg",
    paprika: "steps/seasoning/seasoning-spices-paprika.jpg",
    white: "steps/seasoning/seasoning-spices-white.jpg",
  },
  coating: {
    chickenMedallions:
      "steps/seasoning/coating/seasoning-coating-chicken-medalions.jpg",
    fishRedFillets:
      "steps/seasoning/coating/seasoning-coating-fish-red-fillets.jpg",
    fishWhiteFillets:
      "steps/seasoning/coating/seasoning-coating-fish-white-fillets.jpg",
    redMeatMedallions:
      "steps/seasoning/coating/seasoning-coating-red-meat-medalions.jpg",
  },
};

const stirring = {
  pan: {
    fish: {
      fish: "steps/stirring/pan/fish/stirring-pan-fish-fish.jpg",
      vegetableFish:
        "steps/stirring/pan/fish/stirring-pan-fish-vegetableFish.jpg",
      pastaFish: "steps/stirring/pan/fish/stirring-pan-fish-pastaFish.jpg",
      riceFish: "steps/stirring/pan/fish/stirring-pan-fish-riceFish.jpg",
      riceVeggies: "steps/stirring/pan/fish/stirring-pan-fish-rice-veggies.jpg",
    },
    meat: {
      red: "steps/stirring/pan/meat/red/stirring-pan-meat-red.jpg",
      pastaMeat: "steps/stirring/pan/meat/stirring-pan-meat-pasta.jpg",
      riceMeat: "steps/stirring/pan/meat/stirring-pan-meat-rice.jpg",
      riceVeggies: "steps/stirring/pan/meat/stirring-pan-meat-rice-veggies.jpg",
    },
    dumplings: "steps/stirring/pan/stirring-pan-dumplings.jpg",
    pasta: "steps/stirring/pan/stirring-pan-pasta.jpg",
    rice: {
      general: "steps/stirring/pan/stirring-pan-rice.jpg",
      veggies: "steps/stirring/pan/stirring-pan-rice-veggies.jpg",
    },
    vegetables: "steps/stirring/pan/stirring-pan-vegetables.jpg",
  },
  saucePan: {
    tomato: "steps/stirring/saucePan/stirring-saucePan-tomato.jpg",
    cream: "steps/stirring/saucePan/stirring-saucePan-cream.jpg",
    green: "steps/stirring/saucePan/stirring-saucePan-green.jpg",
  },
  soupPot: {
    red: {
      soup: "steps/stirring/soupPot/red/stirring-soupPot-red-soup.jpg",
      general: "steps/stirring/soupPot/red/stirring-soupPot-red.jpg",
    },
    white: {
      soup: "steps/stirring/soupPot/white/stirring-soupPot-white-soup.jpg",
      general: "steps/stirring/soupPot/white/stirring-soupPot-white.jpg",
    },
    green: {
      soup: "steps/stirring/soupPot/green/stirring-soupPot-green-soup.jpg",
      general: "steps/stirring/soupPot/green/stirring-soupPot-green.jpg",
    },
    curry: {
      soup: "steps/stirring/soupPot/curry/stirring-soupPot-curry-soup.jpg",
      general: "steps/stirring/soupPot/curry/stirring-soupPot-curry.jpg",
    },
  },
};

const stewing = {
  meat: {
    red: {
      cubes: "steps/stewing/meat/red/stewing-meat-red-cubes.jpg",
      gulash: "steps/stewing/meat/red/stewing-meat-red-gulash.jpg",
      withVeggies: "steps/stewing/meat/red/stewing-meat-red-with-veggies.jpg",
    },
  },
  fish: {
    red: "steps/stewing/fish/red/stewing-fish-red.jpg",
    white: "steps/stewing/fish/white/stewing-fish-white.jpg",
    shrimp: "steps/stewing/fish/shrimp/stewing-fish-shrimp.jpg",
  },
  vegetables: {
    mix: "steps/stewing/vegetables/stewing-vegetables-mix.jpg",
    potatoesTomatoes:
      "steps/stewing/vegetables/stewing-vegetables-potatoes-tomatoes.jpg",
  },
};

const tendering = {
  meat: {
    chicken: {
      breast: "steps/tendering/meat/chicken/tendering-meat-chicken-breast.jpg",
      medallions:
        "steps/tendering/meat/chicken/tendering-meat-chicken-medalions.jpg",
    },
    red: {
      chop: "steps/tendering/meat/red/tendering-meat-red-chop.jpg",
      medallions: "steps/tendering/meat/red/tendering-meat-red-medalions.jpg",
    },
  },
};

const waiting = {
  dough: {
    rising: "steps/waiting/dough/waiting-dough-rising.jpg",
    proofing: "steps/waiting/dough/waiting-dough-proofing.jpg",
  },
  marinating: {
    fish: {
      whiteFillets:
        "steps/waiting/marinating/fish/waiting-marinating-fish-white-fillets.jpg",
      whole: "steps/waiting/marinating/fish/waiting-marinating-fish-whole.jpg",
    },
    meat: {
      chicken: {
        breast:
          "steps/waiting/marinating/meat/chicken/waiting-marinating-meat-chicken-breast.jpg",
        drumsticks:
          "steps/waiting/marinating/meat/chicken/waiting-marinating-meat-chicken-drumsticks.jpg",
        medallions:
          "steps/waiting/marinating/meat/chicken/waiting-marinating-meat-chicken-medalions.jpg",
        wings:
          "steps/waiting/marinating/meat/chicken/waiting-marinating-meat-chicken-wings.jpg",
      },
      red: {
        cubes:
          "steps/waiting/marinating/meat/red/waiting-marinating-meat-red-cubes.jpg",
        medallions:
          "steps/waiting/marinating/meat/red/waiting-marinating-meat-red-medalions.jpg",
      },
    },
  },
};

const kitchenAppliances = {
  blender: "steps/kitchenAppliances/kitchenAppliances-blender.jpg",
  cheeseGrating: "steps/kitchenAppliances/kitchenAppliances-cheese-grating.jpg",
  deepFryer: "steps/kitchenAppliances/kitchenAppliances-deep-fryer.jpg",
  handBlender: "steps/kitchenAppliances/kitchenAppliances-hand-blender.jpg",
  meatGrinding: "steps/kitchenAppliances/kitchenAppliances-meat-grounding.jpg",
  mixer: "steps/kitchenAppliances/kitchenAppliances-mixer.jpg",
  multiCooker: "steps/kitchenAppliances/kitchenAppliances-multi-cooker.jpg",
};

export const steps = {
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
// fs.writeFileSync(promptFilePath, "AI Prompts for Cooking Images:\n\n");

// Call the function with the steps object, base path, and prompts file path
// generatePrompts(steps, basePath, promptFilePath);

const toCamelCase = (str) => {
  return str
    .replace(/[-_ ](.)/g, (match, group1) => group1.toUpperCase())
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
};

// Recursive function to extract image paths
const extractImagePaths = (obj, result = {}) => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      extractImagePaths(obj[key], result); // Recurse into nested objects
    } else if (typeof obj[key] === "string" && obj[key].endsWith(".jpg")) {
      const formattedKey = obj[key].replace(".jpg", "").split("/");
      result[formattedKey[formattedKey.length - 1].replace(/-/g, "_")] =
        obj[key];
    }
  }
  return result;
};

const imagePaths = extractImagePaths(steps);

console.log(imagePaths);
