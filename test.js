const nml = require('./notionml');
const distance = require('jaro-winkler')

/*
let max = [0, ""]
const words = [
    "abacus", "banana", "cactus", "dolphin", "elephant", "falcon", "giraffe", "honey", "igloo", "jacket",
    "kiwi", "lemon", "mango", "notebook", "orange", "pencil", "quilt", "rabbit", "sunflower", "tiger",
    "umbrella", "vase", "whale", "xylophone", "yacht", "zebra", "apple", "bridge", "castle", "dragon",
    "eagle", "flame", "glove", "helmet", "island", "jungle", "kite", "lamp", "moon", "night",
    "octopus", "parrot", "quokka", "rose", "snowflake", "train", "unicorn", "vulture", "window", "xenon",
    "yarn", "zoo", "ant", "bell", "cloud", "daisy", "egg", "feather", "goat", "horizon",
    "iceberg", "jewel", "koala", "light", "magnet", "nut", "orchid", "peacock", "queen", "rainbow",
    "star", "tree", "ufo", "volcano", "wave", "xylophone", "yogurt", "zipper", "actor", "breeze",
    "carpet", "dolphin", "eagle", "fire", "giraffe", "honey", "iguana", "jigsaw", "kite", "lighthouse",
    "mouse", "ninja", "owl", "puzzle", "quasar", "robot", "sail", "telescope", "umbrella", "valley",
    "whistle", "xylophone", "yawn", "zebra"
];

words.forEach(word => {
    console.log(distance(word, "sitting"))
    if (distance(word, "sitting") > max[0]) {
        max = [distance(word, "sitting"), word]
    }
})
console.log(max);
*/


nml.create({
    title: "Fire",
    pageIcon: "fire"
})