import facebook from "../../public/assets/icons/facebook.svg";
import instagram from "../../public/assets/icons/instagram.svg";
import youtube from "../../public/assets/icons/youtube.svg";
import twitter from "../../public/assets/icons/twitter.svg";

export const SITE_TITLE = "Cooking Spot";
export const SITE_DESCRIPTION = "Welcome to my cookbook website!";

export const headerLinks = [
  { href: "/recipes", text: "Recipes" },
  { href: "/about", text: "About" },
  { href: "/ingredients", text: "Ingredients" },
];
export const quickLinks = [
  { href: "/", text: "Home" },
  { href: "/recipes", text: "Recipes" },
  { href: "/ingredients", text: "Ingredients" },
];

export const categories = [
  { href: "/category/breakfast", text: "Breakfast" },
  { href: "/category/lunch", text: "Lunch" },
  { href: "/category/dinner", text: "Dinner" },
  { href: "/category/desserts", text: "Desserts" },
];

export const social = [
  {
    href: "https://facebook.com",
    text: "Facebook",
    icon: facebook,
  },
  {
    href: "https://instagram.com",
    text: "Instagram",
    icon: instagram,
  },
  { href: "https://twitter.com", text: "Twitter", icon: twitter },
  { href: "https://youtube.com", text: "YouTube", icon: youtube },
];

const baking = {
  baking_oven_bread_baguette:
    "steps/baking/oven/bread/baking-oven-bread-baguette.jpg",
  baking_oven_bread_loaf: "steps/baking/oven/bread/baking-oven-bread-loaf.jpg",
  baking_oven_bread_rolls:
    "steps/baking/oven/bread/baking-oven-bread-rolls.jpg",
  baking_oven_dessert_cake_cheesecake:
    "steps/baking/oven/dessert/baking-oven-dessert-cake-cheesecake.jpg",
  baking_oven_dessert_cake_chocolate:
    "steps/baking/oven/dessert/baking-oven-dessert-cake-chocolate.jpg",
  baking_oven_dessert_brownies:
    "steps/baking/oven/dessert/baking-oven-dessert-brownies.jpg",
  baking_oven_dessert_cookies:
    "steps/baking/oven/dessert/baking-oven-dessert-cookies.jpg",
  baking_oven_savory_casserole:
    "steps/baking/oven/savory/baking-oven-savory-casserole.jpg",
  baking_oven_savory_lasagna:
    "steps/baking/oven/savory/baking-oven-savory-lasagna.jpg",
  baking_oven_savory_quiche:
    "steps/baking/oven/savory/baking-oven-savory-quiche.jpg",
  baking_oven_savory_rolls:
    "steps/baking/oven/savory/baking-oven-savory-rolls.jpg",
  baking_pastry_pie: "steps/baking/pastry/baking-pastry-pie.jpg",
  baking_pastry_tart_fruit: "steps/baking/pastry/baking-pastry-tart-fruit.jpg",
  baking_pastry_puffPastry_croissant:
    "steps/baking/pastry/baking-pastry-puffPastry-croissant.jpg",
  baking_pastry_puffPastry_palmier:
    "steps/baking/pastry/baking-pastry-puffPastry-palmier.jpg",
};
const boiling = {
  boiling_pasta_long: "steps/boiling/pasta/boiling-pasta-long.jpg",
  boiling_pasta_short: "steps/boiling/pasta/boiling-pasta-short.jpg",
  boiling_pasta_stuffed: "steps/boiling/pasta/boiling-pasta-stuffed.jpg",
  boiling_seafood_crab: "steps/boiling/seafood/boiling-seafood-crab.jpg",
  boiling_seafood_fish: "steps/boiling/seafood/boiling-seafood-fish.jpg",
  boiling_seafood_lobster: "steps/boiling/seafood/boiling-seafood-lobster.jpg",
  boiling_seafood_mussels: "steps/boiling/seafood/boiling-seafood-mussels.jpg",
  boiling_seafood_shrimps: "steps/boiling/seafood/boiling-seafood-shrimps.jpg",
  boiling_soup_broth_veggies:
    "steps/boiling/soup/boiling-soup-broth-veggies.jpg",
  boiling_soup_clear: "steps/boiling/soup/boiling-soup-clear.jpg",
  boiling_soup_curry_veggies:
    "steps/boiling/soup/boiling-soup-curry-veggies.jpg",
  boiling_soup_curry: "steps/boiling/soup/boiling-soup-curry.jpg",
  boiling_soup_green_veggies:
    "steps/boiling/soup/boiling-soup-green-veggies.jpg",
  boiling_soup_green: "steps/boiling/soup/boiling-soup-green.jpg",
  boiling_soup_red_veggies: "steps/boiling/soup/boiling-soup-red-veggies.jpg",
  boiling_soup_red: "steps/boiling/soup/boiling-soup-red.jpg",
  boiling_soup_white_veggies:
    "steps/boiling/soup/boiling-soup-white-veggies.jpg",
  boiling_soup_white: "steps/boiling/soup/boiling-soup-white.jpg",
  boiling_dumplings_chinkali: "steps/boiling/boiling-dumplings-chinkali.jpg",
  boiling_dumplings_pierogi: "steps/boiling/boiling-dumplings-pierogi.jpg",
  boiling_eggs: "steps/boiling/boiling-eggs.jpg",
  boiling_grains_buckwheat: "steps/boiling/boiling-grains-buckwheat.jpg",
  boiling_grains_rice: "steps/boiling/boiling-grains-rice.jpg",
  boiling_grains: "steps/boiling/boiling-grains.jpg",
  boiling_vegetables_green: "steps/boiling/boiling-vegetables-green.jpg",
  boiling_vegetables_mix: "steps/boiling/boiling-vegetables-mix.jpg",
  boiling_vegetables_red: "steps/boiling/boiling-vegetables-red.jpg",
};
const cutting = {
  cutting_bread_buns: "steps/cutting/bread/cutting-bread-buns.jpg",
  cutting_bread_flat: "steps/cutting/bread/cutting-bread-flat.jpg",
  cutting_bread_long: "steps/cutting/bread/cutting-bread-long.jpg",
  cutting_bread_round: "steps/cutting/bread/cutting-bread-round.jpg",
  cutting_cheese_white: "steps/cutting/cheese/cutting-cheese-white.jpg",
  cutting_cheese_yellow: "steps/cutting/cheese/cutting-cheese-yellow.jpg",
  cutting_fish_calamari: "steps/cutting/fish/cutting-fish-calamari.jpg",
  cutting_fish_crab: "steps/cutting/fish/cutting-fish-crab.jpg",
  cutting_fish_lobster: "steps/cutting/fish/cutting-fish-lobster.jpg",
  cutting_fish_pink: "steps/cutting/fish/cutting-fish-pink.jpg",
  cutting_fish_red_whole: "steps/cutting/fish/cutting-fish-red-whole.jpg",
  cutting_fish_red: "steps/cutting/fish/cutting-fish-red.jpg",
  cutting_fish_shrimps: "steps/cutting/fish/cutting-fish-shrimps.jpg",
  cutting_fish_white_whole: "steps/cutting/fish/cutting-fish-white-whole.jpg",
  cutting_fish_white: "steps/cutting/fish/cutting-fish-white.jpg",
  cutting_fruits_apple: "steps/cutting/fruits/cutting-fruits-apple.jpg",
  cutting_fruits_banana: "steps/cutting/fruits/cutting-fruits-banana.jpg",
  cutting_fruits_citrus_orange:
    "steps/cutting/fruits/cutting-fruits-citrus-orange.jpg",
  cutting_fruits_citrus_red:
    "steps/cutting/fruits/cutting-fruits-citrus-red.jpg",
  cutting_fruits_melon: "steps/cutting/fruits/cutting-fruits-melon.jpg",
  cutting_fruits_peach: "steps/cutting/fruits/cutting-fruits-peach.jpg",
  cutting_fruits_pear: "steps/cutting/fruits/cutting-fruits-pear.jpg",
  cutting_fruits_pineapple: "steps/cutting/fruits/cutting-fruits-pineapple.jpg",
  cutting_fruits_watermelon:
    "steps/cutting/fruits/cutting-fruits-watermelon.jpg",
  cutting_fruits_berries_blackberry:
    "steps/cutting/fruits/cutting-fruits-berries-blackberry.jpg",
  cutting_fruits_berries_blueberry:
    "steps/cutting/fruits/cutting-fruits-berries-blueberry.jpg",
  cutting_fruits_berries_raspberry:
    "steps/cutting/fruits/cutting-fruits-berries-raspberry.jpg",
  cutting_fruits_berries_strawberry:
    "steps/cutting/fruits/cutting-fruits-berries-strawberry.jpg",
  cutting_meat_poultry_breasts:
    "steps/cutting/meat/cutting-meat-poultry-breasts.jpg",
  cutting_meat_poultry_drumsticks:
    "steps/cutting/meat/cutting-meat-poultry-drumsticks.jpg",
  cutting_meat_poultry_pieces:
    "steps/cutting/meat/cutting-meat-poultry-pieces.jpg",
  cutting_meat_poultry_whole:
    "steps/cutting/meat/cutting-meat-poultry-whole.jpg",
  cutting_meat_red_chops: "steps/cutting/meat/cutting-meat-red-chops.jpg",
  cutting_meat_red_cubes: "steps/cutting/meat/cutting-meat-red-cubes.jpg",
  cutting_meat_red_ribs: "steps/cutting/meat/cutting-meat-red-ribs.jpg",
  cutting_meat_red_steak: "steps/cutting/meat/cutting-meat-red-steak.jpg",
  cutting_vegetables_carrot:
    "steps/cutting/vegetables/cutting-vegetables-carrot.jpg",
  cutting_vegetables_cucumber:
    "steps/cutting/vegetables/cutting-vegetables-cucumber.jpg",
  cutting_vegetables_eggplant:
    "steps/cutting/vegetables/cutting-vegetables-eggplant.jpg",
  cutting_vegetables_lettuce:
    "steps/cutting/vegetables/cutting-vegetables-lettuce.jpg",
  cutting_vegetables_mix_tomato_califlower:
    "steps/cutting/vegetables/cutting-vegetables-mix-tomato-califlower.jpg",
  cutting_vegetables_mix_tomato_eggplnt_carrot:
    "steps/cutting/vegetables/cutting-vegetables-mix-tomato-eggplnt-carrot.jpg",
  cutting_vegetables_mix_tomato_onion_green:
    "steps/cutting/vegetables/cutting-vegetables-mix-tomato-onion-green.jpg",
  cutting_vegetables_onion:
    "steps/cutting/vegetables/cutting-vegetables-onion.jpg",
  cutting_vegetables_potato:
    "steps/cutting/vegetables/cutting-vegetables-potato.jpg",
  cutting_vegetables_radish:
    "steps/cutting/vegetables/cutting-vegetables-radish.jpg",
  cutting_vegetables_sweetPepper:
    "steps/cutting/vegetables/cutting-vegetables-sweetPepper.jpg",
  cutting_vegetables_tomato:
    "steps/cutting/vegetables/cutting-vegetables-tomato.jpg",
};
const frying = {
  frying_deep_fish: "steps/frying/deep/frying-deep-fish.jpg",
  frying_deep_meat_poultry_breast:
    "steps/frying/deep/meat/frying-deep-meat-poultry-breast.jpg",
  frying_deep_meat_poultry_nuggets:
    "steps/frying/deep/meat/frying-deep-meat-poultry-nuggets.jpg",
  frying_deep_meat_poultry_wings:
    "steps/frying/deep/meat/frying-deep-meat-poultry-wings.jpg",
  frying_deep_meat_red_belly:
    "steps/frying/deep/meat/frying-deep-meat-red-belly.jpg",
  frying_deep_meat_red_chops:
    "steps/frying/deep/meat/frying-deep-meat-red-chops.jpg",
  frying_deep_meat_red_cubes:
    "steps/frying/deep/meat/frying-deep-meat-red-cubes.jpg",
  frying_deep_shrimps: "steps/frying/deep/frying-deep-shrimps.jpg",
  frying_deep_vegetables_fries:
    "steps/frying/deep/vegetables/frying-deep-vegetables-fries.jpg",
  frying_deep_vegetables_tempura:
    "steps/frying/deep/vegetables/frying-deep-vegetables-tempura.jpg",
  frying_pan_fish_cubes: "steps/frying/pan/fish/frying-pan-fish-cubes.jpg",
  frying_pan_fish_lobster: "steps/frying/pan/fish/frying-pan-fish-lobster.jpg",
  frying_pan_fish_red_with_veggies:
    "steps/frying/pan/fish/frying-pan-fish-red-with-veggies.jpg",
  frying_pan_fish_red: "steps/frying/pan/fish/frying-pan-fish-red.jpg",
  frying_pan_fish_shrimps: "steps/frying/pan/fish/frying-pan-fish-shrimps.jpg",
  frying_pan_fish_white_with_veggies:
    "steps/frying/pan/fish/frying-pan-fish-white-with-veggies.jpg",
  frying_pan_fish_white: "steps/frying/pan/fish/frying-pan-fish-white.jpg",
  frying_pan_meat_poultry_breast:
    "steps/frying/pan/meat/frying-pan-meat-poultry-breast.jpg",
  frying_pan_meat_poultry_cubes:
    "steps/frying/pan/meat/frying-pan-meat-poultry-cubes.jpg",
  frying_pan_meat_poultry_drumsticks:
    "steps/frying/pan/meat/frying-pan-meat-poultry-drumsticks.jpg",
  frying_pan_meat_poultry_wings:
    "steps/frying/pan/meat/frying-pan-meat-poultry-wings.jpg",
  frying_pan_meat_poultry_with_veggies:
    "steps/frying/pan/meat/frying-pan-meat-poultry-with-veggies.jpg",
  frying_pan_meat_red_burgers:
    "steps/frying/pan/meat/frying-pan-meat-red-burgers.jpg",
  frying_pan_meat_red_chops:
    "steps/frying/pan/meat/frying-pan-meat-red-chops.jpg",
  frying_pan_meat_red_cubes:
    "steps/frying/pan/meat/frying-pan-meat-red-cubes.jpg",
  frying_pan_meat_red_ribs:
    "steps/frying/pan/meat/frying-pan-meat-red-ribs.jpg",
  frying_pan_meat_red_steak:
    "steps/frying/pan/meat/frying-pan-meat-red-steak.jpg",
  frying_pan_meat_red_with_veggies:
    "steps/frying/pan/meat/frying-pan-meat-red-with-veggies.jpg",
  frying_pan_substance_creamy:
    "steps/frying/pan/substance/frying-pan-substance-creamy.jpg",
  frying_pan_substance_curry:
    "steps/frying/pan/substance/frying-pan-substance-curry.jpg",
  frying_pan_substance_red:
    "steps/frying/pan/substance/frying-pan-substance-red.jpg",
  frying_pan_vegetables_carrots:
    "steps/frying/pan/vegetables/frying-pan-vegetables-carrots.jpg",
  frying_pan_vegetables_green:
    "steps/frying/pan/vegetables/frying-pan-vegetables-green.jpg",
  frying_pan_vegetables_mushrooms:
    "steps/frying/pan/vegetables/frying-pan-vegetables-mushrooms.jpg",
  frying_pan_vegetables_onions:
    "steps/frying/pan/vegetables/frying-pan-vegetables-onions.jpg",
  frying_pan_vegetables_potatoes:
    "steps/frying/pan/vegetables/frying-pan-vegetables-potatoes.jpg",
  frying_pan_mix_vegetableMix:
    "steps/frying/pan/vegetables/frying-pan-mix-vegetableMix.jpg",
  frying_pan_dumplings: "steps/frying/pan/frying-pan-dumplings.jpg",
  frying_pan_eggs: "steps/frying/pan/frying-pan-eggs.jpg",
};
const grilling = {
  grilling_fish_calamari: "steps/grilling/fish/grilling-fish-calamari.jpg",
  grilling_fish_red: "steps/grilling/fish/grilling-fish-red.jpg",
  grilling_fish_shrimp: "steps/grilling/fish/grilling-fish-shrimp.jpg",
  grilling_fish_white: "steps/grilling/fish/grilling-fish-white.jpg",
  grilling_meat_poultry_breast:
    "steps/grilling/meat/grilling-meat-poultry-breast.jpg",
  grilling_meat_poultry_drumsticks:
    "steps/grilling/meat/grilling-meat-poultry-drumsticks.jpg",
  grilling_meat_poultry_thighs:
    "steps/grilling/meat/grilling-meat-poultry-thighs.jpg",
  grilling_meat_poultry_wings:
    "steps/grilling/meat/grilling-meat-poultry-wings.jpg",
  grilling_meat_red_burgers:
    "steps/grilling/meat/grilling-meat-red-burgers.jpg",
  grilling_meat_red_ribs: "steps/grilling/meat/grilling-meat-red-ribs.jpg",
  grilling_meat_red_steak: "steps/grilling/meat/grilling-meat-red-steak.jpg",
  grilling_skewers_meat: "steps/grilling/skewers/grilling-skewers-meat.jpg",
  grilling_skewers_mixed: "steps/grilling/skewers/grilling-skewers-mixed.jpg",
  grilling_skewers_veggie: "steps/grilling/skewers/grilling-skewers-veggie.jpg",
  grilling_vegetables_corn:
    "steps/grilling/vegetables/grilling-vegetables-corn.jpg",
  grilling_vegetables_mix:
    "steps/grilling/vegetables/grilling-vegetables-mix.jpg",
  grilling_vegetables_onions:
    "steps/grilling/vegetables/grilling-vegetables-onions.jpg",
  grilling_vegetables_peppers:
    "steps/grilling/vegetables/grilling-vegetables-peppers.jpg",
  grilling_vegetables_tomatoes:
    "steps/grilling/vegetables/grilling-vegetables-tomatoes.jpg",
  grilling_halloumi: "steps/grilling/grilling-halloumi.jpg",
};
const kitchenAppliances = {
  kitchenAppliances_blender:
    "steps/kitchenAppliances/kitchenAppliances-blender.jpg",
  kitchenAppliances_cheese_grating:
    "steps/kitchenAppliances/kitchenAppliances-cheese-grating.jpg",
  kitchenAppliances_deep_fryer:
    "steps/kitchenAppliances/kitchenAppliances-deep-fryer.jpg",
  kitchenAppliances_hand_blender:
    "steps/kitchenAppliances/kitchenAppliances-hand-blender.jpg",
  kitchenAppliances_meat_grounding:
    "steps/kitchenAppliances/kitchenAppliances-meat-grounding.jpg",
  kitchenAppliances_mixer:
    "steps/kitchenAppliances/kitchenAppliances-mixer.jpg",
  kitchenAppliances_multi_cooker:
    "steps/kitchenAppliances/kitchenAppliances-multi-cooker.jpg",
};
const mixing = {
  mixing_bowl_fruits_fruitSalad:
    "steps/mixing/bowl/fruits/mixing-bowl-fruits-fruitSalad.jpg",
  mixing_bowl_fruits_smoothie:
    "steps/mixing/bowl/fruits/mixing-bowl-fruits-smoothie.jpg",
  mixing_bowl_liquids_batter:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-batter.jpg",
  mixing_bowl_liquids_broth:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-broth.jpg",
  mixing_bowl_liquids_curry:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-curry.jpg",
  mixing_bowl_liquids_marinade:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-marinade.jpg",
  mixing_bowl_liquids_red:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-red.jpg",
  mixing_bowl_liquids_white:
    "steps/mixing/bowl/liquids/mixing-bowl-liquids-white.jpg",
  mixing_bowl_vegetables_salad:
    "steps/mixing/bowl/vegetables/mixing-bowl-vegetables-salad.jpg",
  mixing_bowl_vegetables_stirFry:
    "steps/mixing/bowl/vegetables/mixing-bowl-vegetables-stirFry.jpg",
  mixing_dough_ryeDough: "steps/mixing/dough/mixing-dough-ryeDough.jpg",
  mixing_dough_white: "steps/mixing/dough/mixing-dough-white.jpg",
  mixing_dough_yellowDough: "steps/mixing/dough/mixing-dough-yellowDough.jpg",
  mixing_mixer_curry: "steps/mixing/mixer/mixing-mixer-curry.jpg",
  mixing_mixer_green: "steps/mixing/mixer/mixing-mixer-green.jpg",
  mixing_mixer_red: "steps/mixing/mixer/mixing-mixer-red.jpg",
  mixing_mixer_white: "steps/mixing/mixer/mixing-mixer-white.jpg",
};
const roasting = {
  roasting_oven_fish_crab:
    "steps/roasting/oven/fish/roasting-oven-fish-crab.jpg",
  roasting_oven_fish_full_alumini_foil:
    "steps/roasting/oven/fish/roasting-oven-fish-full-alumini-foil.jpg",
  roasting_oven_fish_full:
    "steps/roasting/oven/fish/roasting-oven-fish-full.jpg",
  roasting_oven_fish_lobster:
    "steps/roasting/oven/fish/roasting-oven-fish-lobster.jpg",
  roasting_oven_fish_red: "steps/roasting/oven/fish/roasting-oven-fish-red.jpg",
  roasting_oven_fish_shrimps:
    "steps/roasting/oven/fish/roasting-oven-fish-shrimps.jpg",
  roasting_oven_fish_white:
    "steps/roasting/oven/fish/roasting-oven-fish-white.jpg",
  roasting_oven_meat_chicken_foil:
    "steps/roasting/oven/meat/roasting-oven-meat-chicken-foil.jpg",
  roasting_oven_meat_chicken:
    "steps/roasting/oven/meat/roasting-oven-meat-chicken.jpg",
  roasting_oven_meat_drumsticks_foil:
    "steps/roasting/oven/meat/roasting-oven-meat-drumsticks-foil.jpg",
  roasting_oven_meat_drumsticks:
    "steps/roasting/oven/meat/roasting-oven-meat-drumsticks.jpg",
  roasting_oven_meat_loaf_foil:
    "steps/roasting/oven/meat/roasting-oven-meat-loaf-foil.jpg",
  roasting_oven_meat_loaf:
    "steps/roasting/oven/meat/roasting-oven-meat-loaf.jpg",
  roasting_oven_meat_red_foil:
    "steps/roasting/oven/meat/roasting-oven-meat-red-foil.jpg",
  roasting_oven_meat_red: "steps/roasting/oven/meat/roasting-oven-meat-red.jpg",
  roasting_oven_vegetablesMix:
    "steps/roasting/oven/roasting-oven-vegetablesMix.jpg",
};
const seasoning = {
  seasoning_coating_chicken_medalions:
    "steps/seasoning/coating/seasoning-coating-chicken-medalions.jpg",
  seasoning_coating_fish_red_fillets:
    "steps/seasoning/coating/seasoning-coating-fish-red-fillets.jpg",
  seasoning_coating_fish_white_fillets:
    "steps/seasoning/coating/seasoning-coating-fish-white-fillets.jpg",
  seasoning_coating_red_meat_medalions:
    "steps/seasoning/coating/seasoning-coating-red-meat-medalions.jpg",
  seasoning_spices_black: "steps/seasoning/seasoning-spices-black.jpg",
  seasoning_spices_curry: "steps/seasoning/seasoning-spices-curry.jpg",
  seasoning_spices_green: "steps/seasoning/seasoning-spices-green.jpg",
  seasoning_spices_mix: "steps/seasoning/seasoning-spices-mix.jpg",
  seasoning_spices_paprika: "steps/seasoning/seasoning-spices-paprika.jpg",
  seasoning_spices_white: "steps/seasoning/seasoning-spices-white.jpg",
};
const steaming = {
  steaming_fish_crab: "steps/steaming/fish/steaming-fish-crab.jpg",
  steaming_fish_lobster: "steps/steaming/fish/steaming-fish-lobster.jpg",
  steaming_fish_red: "steps/steaming/fish/steaming-fish-red.jpg",
  steaming_fish_shrimps: "steps/steaming/fish/steaming-fish-shrimps.jpg",
  steaming_fish_white: "steps/steaming/fish/steaming-fish-white.jpg",
  steaming_meat_chicken: "steps/steaming/meat/steaming-meat-chicken.jpg",
  steaming_meat_drumsticks: "steps/steaming/meat/steaming-meat-drumsticks.jpg",
  steaming_meat_red_cubes: "steps/steaming/meat/steaming-meat-red-cubes.jpg",
  steaming_meat_red_steak: "steps/steaming/meat/steaming-meat-red-steak.jpg",
  steaming_vegetables_brocolli:
    "steps/steaming/vegetables/steaming-vegetables-brocolli.jpg",
  steaming_vegetables_califlower:
    "steps/steaming/vegetables/steaming-vegetables-califlower.jpg",
  steaming_vegetables_carrots:
    "steps/steaming/vegetables/steaming-vegetables-carrots.jpg",
  steaming_vegetables_green:
    "steps/steaming/vegetables/steaming-vegetables-green.jpg",
  steaming_vegetables_mix:
    "steps/steaming/vegetables/steaming-vegetables-mix.jpg",
  steaming_vegetables_potatoes:
    "steps/steaming/vegetables/steaming-vegetables-potatoes.jpg",
  steaming_dumplings_chinkali: "steps/steaming/steaming-dumplings-chinkali.jpg",
  steaming_grain: "steps/steaming/steaming-grain.jpg",
  steaming_pierogi: "steps/steaming/steaming-pierogi.jpg",
  steaming_rice: "steps/steaming/steaming-rice.jpg",
};
const stewing = {
  stewing_fish_red: "steps/stewing/fish/stewing-fish-red.jpg",
  stewing_fish_shrimp: "steps/stewing/fish/stewing-fish-shrimp.jpg",
  stewing_fish_white: "steps/stewing/fish/stewing-fish-white.jpg",
  stewing_meat_red_cubes: "steps/stewing/meat/stewing-meat-red-cubes.jpg",
  stewing_meat_red_gulash: "steps/stewing/meat/stewing-meat-red-gulash.jpg",
  stewing_meat_red_with_veggies:
    "steps/stewing/meat/stewing-meat-red-with-veggies.jpg",
  stewing_vegetables_mix: "steps/stewing/vegetables/stewing-vegetables-mix.jpg",
  stewing_vegetables_potatoes_tomatoes:
    "steps/stewing/vegetables/stewing-vegetables-potatoes-tomatoes.jpg",
};
const stirring = {
  stirring_pan_fish: "steps/stirring/pan/fish/stirring-pan-fish.jpg",
  stirring_pan_fish_pasta:
    "steps/stirring/pan/fish/stirring-pan-fish-pasta.jpg",
  stirring_pan_fish_rice_veggies:
    "steps/stirring/pan/fish/stirring-pan-fish-rice-veggies.jpg",
  stirring_pan_fish_rice: "steps/stirring/pan/fish/stirring-pan-fish-rice.jpg",
  stirring_pan_fish_veggies:
    "steps/stirring/pan/fish/stirring-pan-fish-veggies.jpg",
  stirring_pan_meat_pasta:
    "steps/stirring/pan/meat/stirring-pan-meat-pasta.jpg",
  stirring_pan_meat_red: "steps/stirring/pan/meat/stirring-pan-meat-red.jpg",
  stirring_pan_meat_rice_veggies:
    "steps/stirring/pan/meat/stirring-pan-meat-rice-veggies.jpg",
  stirring_pan_meat_rice: "steps/stirring/pan/meat/stirring-pan-meat-rice.jpg",
  stirring_pan_dumplings: "steps/stirring/pan/stirring-pan-dumplings.jpg",
  stirring_pan_pasta: "steps/stirring/pan/stirring-pan-pasta.jpg",
  stirring_pan_rice_veggies: "steps/stirring/pan/stirring-pan-rice-veggies.jpg",
  stirring_pan_rice: "steps/stirring/pan/stirring-pan-rice.jpg",
  stirring_pan_vegetables: "steps/stirring/pan/stirring-pan-vegetables.jpg",
  stirring_saucePan_cream:
    "steps/stirring/saucePan/stirring-saucePan-cream.jpg",
  stirring_saucePan_green:
    "steps/stirring/saucePan/stirring-saucePan-green.jpg",
  stirring_saucePan_tomato:
    "steps/stirring/saucePan/stirring-saucePan-tomato.jpg",
  stirring_soupPot_curry_soup:
    "steps/stirring/soupPot/stirring-soupPot-curry-soup.jpg",
  stirring_soupPot_curry: "steps/stirring/soupPot/stirring-soupPot-curry.jpg",
  stirring_soupPot_green_soup:
    "steps/stirring/soupPot/stirring-soupPot-green-soup.jpg",
  stirring_soupPot_green: "steps/stirring/soupPot/stirring-soupPot-green.jpg",
  stirring_soupPot_red_soup:
    "steps/stirring/soupPot/stirring-soupPot-red-soup.jpg",
  stirring_soupPot_red: "steps/stirring/soupPot/stirring-soupPot-red.jpg",
  stirring_soupPot_white_soup:
    "steps/stirring/soupPot/stirring-soupPot-white-soup.jpg",
  stirring_soupPot_white: "steps/stirring/soupPot/stirring-soupPot-white.jpg",
};
const tendering = {
  tendering_meat_chicken_breast:
    "steps/tendering/meat/tendering-meat-chicken-breast.jpg",
  tendering_meat_chicken_medalions:
    "steps/tendering/meat/tendering-meat-chicken-medalions.jpg",
  tendering_meat_red_chop: "steps/tendering/meat/tendering-meat-red-chop.jpg",
  tendering_meat_red_medalions:
    "steps/tendering/meat/tendering-meat-red-medalions.jpg",
};
const waiting = {
  waiting_dough_proofing: "steps/waiting/dough/waiting-dough-proofing.jpg",
  waiting_dough_rising: "steps/waiting/dough/waiting-dough-rising.jpg",
  waiting_marinating_fish_white_fillets:
    "steps/waiting/marinating/waiting-marinating-fish-white-fillets.jpg",
  waiting_marinating_fish_whole:
    "steps/waiting/marinating/waiting-marinating-fish-whole.jpg",
  waiting_marinating_meat_chicken_breast:
    "steps/waiting/marinating/waiting-marinating-meat-chicken-breast.jpg",
  waiting_marinating_meat_chicken_drumsticks:
    "steps/waiting/marinating/waiting-marinating-meat-chicken-drumsticks.jpg",
  waiting_marinating_meat_chicken_medalions:
    "steps/waiting/marinating/waiting-marinating-meat-chicken-medalions.jpg",
  waiting_marinating_meat_chicken_wings:
    "steps/waiting/marinating/waiting-marinating-meat-chicken-wings.jpg",
  waiting_marinating_meat_red_cubes:
    "steps/waiting/marinating/waiting-marinating-meat-red-cubes.jpg",
  waiting_marinating_meat_red_medalions:
    "steps/waiting/marinating/waiting-marinating-meat-red-medalions.jpg",
};

export const STEPS_IMAGES = {
  default: "steps/default.png",
  ...baking,
  ...boiling,
  ...cutting,
  ...frying,
  ...grilling,
  ...tendering,
  ...steaming,
  ...seasoning,
  ...stewing,
  ...stirring,
  ...roasting,
  ...mixing,
  ...kitchenAppliances,
  ...waiting,
};
