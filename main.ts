namespace SpriteKind {
    export const RoadLine = SpriteKind.create()
    export const VisionBlock = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Wall = SpriteKind.create()
    export const Turtle = SpriteKind.create()
    export const Decoration = SpriteKind.create()
}


// GAME VARIABLES


let phase = 0
let selectedCharacter = 0


let player: Sprite = null
let goal: Sprite = null
let preview: Sprite = null


let distance = 0
let visionDamage = 0
let turtleHit = false
let canTakeDamage = true


// phase 0 = title screen
// phase 1 = character select
// phase 2 = driving
// phase 3 = hospital parking lot
// phase 4 = hospital
// phase 5 = ending
// phase 10 = cutscene




// PLAYER DESIGNS


let playerChoices = [
    img`
    . . . . . 5 5 5 5 5 . . . . . .
    . . . . 5 5 5 5 5 5 5 . . . . .
    . . . . d d d d d d d . . . . .
    . . . d d f d d f d d d . . . .
    . . . d d d d d d d d d . . . .
    . . . . d d d d d d d . . . . .
    . . . . . d d d d d . . . . . .
    . . . . . 8 8 8 8 8 . . . . . .
    . . . . 8 8 8 8 8 8 8 . . . . .
    . . . 8 8 8 8 8 8 8 8 8 . . . .
    . . . 8 8 8 8 8 8 8 8 8 . . . .
    . . . . 8 8 8 8 8 8 8 . . . . .
    . . . . 8 . . . . . 8 . . . . .
    . . . . 8 . . . . . 8 . . . . .
    . . . 8 8 . . . . . 8 8 . . . .
    . . . . . . . . . . . . . . . .
`,
    img`
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . . d d d d d d d . . . . .
    . . . d d f d d f d d d . . . .
    . . . d d d d d d d d d . . . .
    . . . . d d d d d d d . . . . .
    . . . . . d d d d d . . . . . .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . 2 2 2 2 2 2 2 2 2 . . . .
    . . . 2 2 2 2 2 2 2 2 2 . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . . 2 . . . . . 2 . . . . .
    . . . . 2 . . . . . 2 . . . . .
    . . . 2 2 . . . . . 2 2 . . . .
    . . . . . . . . . . . . . . . .
`,
    img`
    . . . . . 9 9 9 9 9 . . . . . .
    . . . . 9 9 9 9 9 9 9 . . . . .
    . . . . d d d d d d d . . . . .
    . . . d d f d d f d d d . . . .
    . . . d d d d d d d d d . . . .
    . . . . d d d d d d d . . . . .
    . . . . . d d d d d . . . . . .
    . . . . . 7 7 7 7 7 . . . . . .
    . . . . 7 7 7 7 7 7 7 . . . . .
    . . . 7 7 7 7 7 7 7 7 7 . . . .
    . . . 7 7 7 7 7 7 7 7 7 . . . .
    . . . . 7 7 7 7 7 7 7 . . . . .
    . . . . 7 . . . . . 7 . . . . .
    . . . . 7 . . . . . 7 . . . . .
    . . . 7 7 . . . . . 7 7 . . . .
    . . . . . . . . . . . . . . . .
`
]




// PLAYER CARS


let carChoices = [
    img`
    . . . . 8 8 8 8 8 8 8 8 . . . .
    . . . 8 8 8 8 8 8 8 8 8 8 . . .
    . . 8 8 9 9 9 9 9 9 9 9 8 8 . .
    . . 8 8 9 9 9 9 9 9 9 9 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . .
    . . 8 8 1 1 8 8 8 8 1 1 8 8 . .
    . . 8 8 1 1 8 8 8 8 1 1 8 8 . .
    . . f f . . . . . . . . f f . .
    . . f f . . . . . . . . f f . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,
    img`
    . . . . 2 2 2 2 2 2 2 2 . . . .
    . . . 2 2 2 2 2 2 2 2 2 2 . . .
    . . 2 2 9 9 9 9 9 9 9 9 2 2 . .
    . . 2 2 9 9 9 9 9 9 9 9 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . 2 2 1 1 2 2 2 2 1 1 2 2 . .
    . . 2 2 1 1 2 2 2 2 1 1 2 2 . .
    . . f f . . . . . . . . f f . .
    . . f f . . . . . . . . f f . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,
    img`
    . . . . 7 7 7 7 7 7 7 7 . . . .
    . . . 7 7 7 7 7 7 7 7 7 7 . . .
    . . 7 7 9 9 9 9 9 9 9 9 7 7 . .
    . . 7 7 9 9 9 9 9 9 9 9 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . 7 7 1 1 7 7 7 7 1 1 7 7 . .
    . . 7 7 1 1 7 7 7 7 1 1 7 7 . .
    . . f f . . . . . . . . f f . .
    . . f f . . . . . . . . f f . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`
]




// ENEMY CAR


let enemyCarImage = img`
    . . . . 4 4 4 4 4 4 4 4 . . . .
    . . . 4 4 4 4 4 4 4 4 4 4 . . .
    . . 4 4 9 9 9 9 9 9 9 9 4 4 . .
    . . 4 4 9 9 9 9 9 9 9 9 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . .
    . . 4 4 1 1 4 4 4 4 1 1 4 4 . .
    . . 4 4 1 1 4 4 4 4 1 1 4 4 . .
    . . f f . . . . . . . . f f . .
    . . f f . . . . . . . . f f . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`




// TURTLE


let turtleImage = img`
    . . . . . . 7 7 7 7 . . . . . .
    . . . . 7 7 7 7 7 7 7 7 . . . .
    . . . 7 7 6 6 6 6 6 6 7 7 . . .
    . . 7 7 6 7 7 7 7 7 6 7 7 . . .
    . . 7 6 7 6 6 6 6 6 7 6 7 . . .
    . 7 7 6 7 6 7 7 6 7 6 7 7 . .
    . 7 7 6 7 6 7 7 6 7 6 7 7 . .
    . 7 7 6 7 6 6 6 6 7 6 7 7 . .
    . . 7 6 7 7 7 7 7 7 7 6 7 . . .
    . . 7 7 6 6 6 6 6 6 6 7 7 . . .
    . . . 7 7 7 7 7 7 7 7 7 . . . .
    . . 7 7 . . 7 7 7 7 . . 7 7 . .
    . 7 7 . . . . . . . . . . 7 7 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`




// TITLE SCREEN


function showHomeScreen() {
    phase = 0


    scene.setBackgroundColor(15)


    let bg = image.create(160, 120)


    bg.fill(15)


    bg.fillRect(0, 88, 160, 32, 12)


    bg.fillRect(20, 100, 30, 3, 1)
    bg.fillRect(70, 100, 30, 3, 1)
    bg.fillRect(120, 100, 30, 3, 1)


    bg.print("TURTLE", 49, 20, 7)
    bg.print("BANGER", 49, 32, 5)


    bg.print("THE WORST WISH EVER", 28, 55, 1)


    bg.print("PRESS A", 56, 74, 9)


    scene.setBackgroundImage(bg)
}




// CHARACTER SELECT


function showCharacterSelect() {
    phase = 1


    if (preview) {
        preview.destroy()
    }


    let bg = image.create(160, 120)


    bg.fill(15)


    bg.print("CHOOSE PLAYER", 43, 12, 1)


    bg.print("<", 26, 58, 5)
    bg.print(">", 128, 58, 5)


    if (selectedCharacter == 0) {
        bg.print("PLAYER 1", 57, 84, 8)
        bg.print("BLUE", 68, 94, 8)
    } else if (selectedCharacter == 1) {
        bg.print("PLAYER 2", 57, 84, 2)
        bg.print("RED", 71, 94, 2)
    } else {
        bg.print("PLAYER 3", 57, 84, 7)
        bg.print("GREEN", 65, 94, 7)
    }


    bg.print("A = SELECT", 55, 108, 1)


    scene.setBackgroundImage(bg)


    preview = sprites.create(
        playerChoices[selectedCharacter],
        SpriteKind.Decoration
    )


    preview.setScale(2)


    preview.setPosition(80, 54)
}




// ROAD BACKGROUND


function makeRoadBackground() {
    let bg = image.create(160, 120)


    bg.fill(7)


    bg.fillRect(25, 0, 110, 120, 15)


    bg.fillRect(22, 0, 3, 120, 1)
    bg.fillRect(135, 0, 3, 120, 1)


    bg.fillRect(60, 0, 2, 120, 13)
    bg.fillRect(98, 0, 2, 120, 13)


    scene.setBackgroundImage(bg)
}




// OPENING CUTSCENE


function openingCutscene() {
    phase = 10


    if (preview) {
        preview.destroy()
    }


    sprites.destroyAllSpritesOfKind(SpriteKind.Decoration)
    sprites.destroyAllSpritesOfKind(SpriteKind.Turtle)


    controller.moveSprite(null, 0, 0)


    // LIVING ROOM


    let livingRoom = image.create(160, 120)


    livingRoom.fill(13)


    livingRoom.fillRect(0, 88, 160, 32, 4)


    // Rug
    livingRoom.fillRect(55, 100, 70, 12, 8)


    // Window
    livingRoom.fillRect(115, 12, 32, 30, 1)
    livingRoom.fillRect(118, 15, 26, 24, 9)


    livingRoom.drawLine(131, 15, 131, 39, 1)
    livingRoom.drawLine(118, 27, 144, 27, 1)


    // Lamp
    livingRoom.fillRect(102, 48, 3, 32, 15)
    livingRoom.fillRect(96, 45, 15, 6, 5)


    // Picture frame
    livingRoom.fillRect(65, 15, 24, 18, 15)
    livingRoom.fillRect(68, 18, 18, 12, 7)


    scene.setBackgroundImage(livingRoom)


    // TV


    let tvImage = image.create(35, 27)


    tvImage.fillRect(0, 0, 35, 24, 15)


    tvImage.fillRect(3, 3, 29, 18, 9)


    tvImage.fillRect(7, 8, 7, 7, 2)
    tvImage.fillRect(19, 7, 8, 9, 7)


    tvImage.fillRect(10, 24, 3, 3, 15)
    tvImage.fillRect(22, 24, 3, 3, 15)


    let tv = sprites.create(
        tvImage,
        SpriteKind.Decoration
    )


    tv.setPosition(28, 58)


    // Couch


    let couchImage = image.create(48, 22)


    couchImage.fillRect(3, 4, 42, 15, 2)


    couchImage.fillRect(0, 8, 6, 12, 2)
    couchImage.fillRect(42, 8, 6, 12, 2)


    couchImage.fillRect(7, 6, 15, 10, 4)
    couchImage.fillRect(26, 6, 15, 10, 4)


    couchImage.fillRect(6, 19, 4, 3, 15)
    couchImage.fillRect(38, 19, 4, 3, 15)


    let couch = sprites.create(
        couchImage,
        SpriteKind.Decoration
    )


    couch.setPosition(102, 83)


    let cutscenePlayer = sprites.create(
        playerChoices[selectedCharacter],
        SpriteKind.Decoration
    )


    cutscenePlayer.setPosition(102, 68)


    game.showLongText(
        "After a long day, you sit on the couch watching your favorite TV show.",
        DialogLayout.Bottom
    )


    cutscenePlayer.sayText(
        "Man... turtles are awesome.",
        1800,
        false
    )


    pause(1900)


    cutscenePlayer.sayText(
        "I wish I had a turtle.",
        1800,
        false
    )


    pause(1900)


    cutscenePlayer.sayText(
        "That would be so cool.",
        1500,
        false
    )


    pause(1600)


    // WISH LETTER


    let letterImage = image.create(12, 8)


    letterImage.fill(1)


    letterImage.drawRect(
        0,
        0,
        12,
        8,
        15
    )


    letterImage.drawLine(
        1,
        1,
        6,
        5,
        15
    )


    letterImage.drawLine(
        10,
        1,
        6,
        5,
        15
    )


    let letter = sprites.create(
        letterImage,
        SpriteKind.Decoration
    )


    letter.setPosition(
        cutscenePlayer.x,
        52
    )


    cutscenePlayer.sayText(
        "Please?",
        1000,
        false
    )


    pause(700)


    letter.vy = -40


    pause(1500)


    letter.destroy()




    // HEAVEN


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    let heaven = image.create(
        160,
        120
    )


    heaven.fill(9)


    heaven.fillRect(
        0,
        85,
        160,
        35,
        1
    )


    heaven.fillRect(
        10,
        75,
        35,
        20,
        1
    )


    heaven.fillRect(
        55,
        80,
        45,
        20,
        1
    )


    heaven.fillRect(
        115,
        72,
        40,
        25,
        1
    )


    heaven.print(
        "SOMEWHERE ABOVE...",
        35,
        12,
        1
    )


    scene.setBackgroundImage(
        heaven
    )


    // God


    let godImage = image.create(
        20,
        28
    )


    godImage.drawRect(
        4,
        0,
        12,
        3,
        5
    )


    godImage.fillRect(
        7,
        5,
        6,
        7,
        13
    )


    godImage.fillRect(
        6,
        4,
        8,
        3,
        1
    )


    godImage.setPixel(
        8,
        8,
        15
    )


    godImage.setPixel(
        11,
        8,
        15
    )


    godImage.fillRect(
        4,
        12,
        12,
        13,
        1
    )


    godImage.fillRect(
        1,
        14,
        5,
        4,
        1
    )


    godImage.fillRect(
        14,
        14,
        5,
        4,
        1
    )


    let god = sprites.create(
        godImage,
        SpriteKind.Decoration
    )


    god.setPosition(
        80,
        55
    )


    letter = sprites.create(
        letterImage,
        SpriteKind.Decoration
    )


    letter.setPosition(
        80,
        110
    )


    letter.vy = -35


    pause(1300)


    letter.vy = 0


    letter.setPosition(
        80,
        73
    )


    god.sayText(
        "Hmm... a wish?",
        1500,
        false
    )


    pause(1600)


    god.sayText(
        "He wants a turtle?",
        1500,
        false
    )


    pause(1600)


    god.sayText(
        "That seems reasonable.",
        1600,
        false
    )


    pause(1700)


    god.sayText(
        "Wish granted.",
        1500,
        false
    )


    pause(1800)




    // HELL


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    let hell = image.create(
        160,
        120
    )


    hell.fill(2)


    hell.fillRect(
        0,
        90,
        160,
        30,
        15
    )


    // Fire
    hell.fillRect(
        10,
        80,
        20,
        20,
        4
    )


    hell.fillRect(
        65,
        75,
        25,
        25,
        4
    )


    hell.fillRect(
        125,
        82,
        20,
        18,
        4
    )


    hell.fillRect(
        15,
        73,
        9,
        10,
        5
    )


    hell.fillRect(
        72,
        67,
        10,
        15,
        5
    )


    hell.fillRect(
        130,
        75,
        8,
        10,
        5
    )


    hell.print(
        "SOMEWHERE BELOW...",
        34,
        12,
        1
    )


    scene.setBackgroundImage(
        hell
    )


    // Devil


    let devilImage = image.create(
        20,
        28
    )


    devilImage.fillRect(
        4,
        1,
        3,
        5,
        2
    )


    devilImage.fillRect(
        13,
        1,
        3,
        5,
        2
    )


    devilImage.fillRect(
        6,
        5,
        8,
        8,
        2
    )


    devilImage.setPixel(
        8,
        8,
        1
    )


    devilImage.setPixel(
        12,
        8,
        1
    )


    devilImage.fillRect(
        4,
        13,
        12,
        12,
        2
    )


    devilImage.fillRect(
        1,
        15,
        5,
        4,
        2
    )


    devilImage.fillRect(
        14,
        15,
        5,
        4,
        2
    )


    let devil = sprites.create(
        devilImage,
        SpriteKind.Decoration
    )


    devil.setPosition(
        80,
        58
    )


    letter = sprites.create(
        letterImage,
        SpriteKind.Decoration
    )


    letter.setPosition(
        15,
        60
    )


    letter.vx = 40


    pause(1400)


    letter.vx = 0


    letter.setPosition(
        66,
        60
    )


    devil.sayText(
        "What's this?",
        1300,
        false
    )


    pause(1400)


    devil.sayText(
        "He wants a turtle?",
        1500,
        false
    )


    pause(1600)


    devil.sayText(
        "Oh, I'll give him a turtle.",
        1800,
        false
    )


    pause(1900)


    devil.sayText(
        "I know EXACTLY where to put it.",
        2000,
        false
    )


    pause(2100)


    devil.sayText(
        "HEH HEH HEH...",
        1500,
        false
    )


    pause(1700)




    // RETURN TO HOUSE


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    scene.setBackgroundImage(
        livingRoom
    )


    tv = sprites.create(
        tvImage,
        SpriteKind.Decoration
    )


    tv.setPosition(
        28,
        58
    )


    couch = sprites.create(
        couchImage,
        SpriteKind.Decoration
    )


    couch.setPosition(
        102,
        83
    )


    cutscenePlayer = sprites.create(
        playerChoices[selectedCharacter],
        SpriteKind.Decoration
    )


    cutscenePlayer.setPosition(
        102,
        68
    )


    cutscenePlayer.sayText(
        "This episode is getting good.",
        1700,
        false
    )


    pause(1800)




    // TURTLE DROPS


    let turtle = sprites.create(
        turtleImage,
        SpriteKind.Turtle
    )


    turtle.setPosition(
        102,
        0
    )


    turtle.vy = 100


    pause(550)


    scene.cameraShake(
        10,
        900
    )


    turtle.destroy()


    game.showLongText(
        "BONK!",
        DialogLayout.Center
    )


    cutscenePlayer.y += 13


    cutscenePlayer.sayText(
        "...",
        1200,
        false
    )


    pause(1300)




    // DEVIL LAUGHS


    devil = sprites.create(
        devilImage,
        SpriteKind.Decoration
    )


    devil.setPosition(
        140,
        55
    )


    devil.sayText(
        "HAHAHAHAHAHA!",
        2200,
        false
    )


    scene.cameraShake(
        2,
        500
    )


    pause(2300)


    devil.destroy()




    // BLACKOUT


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Turtle
    )


    scene.setBackgroundColor(
        15
    )


    let blackScreen = image.create(
        160,
        120
    )


    blackScreen.fill(
        15
    )


    scene.setBackgroundImage(
        blackScreen
    )


    game.showLongText(
        "Everything goes black...",
        DialogLayout.Full
    )


    pause(700)


    game.showLongText(
        "A few minutes later...",
        DialogLayout.Full
    )




    // WAKE UP


    scene.setBackgroundImage(
        livingRoom
    )


    couch = sprites.create(
        couchImage,
        SpriteKind.Decoration
    )


    couch.setPosition(
        102,
        83
    )


    tv = sprites.create(
        tvImage,
        SpriteKind.Decoration
    )


    tv.setPosition(
        28,
        58
    )


    cutscenePlayer = sprites.create(
        playerChoices[selectedCharacter],
        SpriteKind.Decoration
    )


    cutscenePlayer.setPosition(
        102,
        74
    )


    cutscenePlayer.sayText(
        "Ow... my head...",
        1600,
        false
    )


    pause(1700)


    cutscenePlayer.sayText(
        "What just happened?",
        1600,
        false
    )


    pause(1700)


    cutscenePlayer.sayText(
        "Why is my vision messed up?",
        2000,
        false
    )


    pause(2100)


    cutscenePlayer.sayText(
        "I need a hospital.",
        1700,
        false
    )


    pause(1800)




    // TRAVEL CUTSCENE


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    makeRoadBackground()


    let travelCar = sprites.create(
        carChoices[selectedCharacter],
        SpriteKind.Decoration
    )


    travelCar.setPosition(
        80,
        105
    )


    game.showLongText(
        "The nearest hospital is across town.",
        DialogLayout.Bottom
    )


    game.showLongText(
        "Your vision is getting worse. You have to reach the hospital before you completely lose your sight.",
        DialogLayout.Bottom
    )


    travelCar.vy = -35


    pause(1800)


    travelCar.destroy()


    startDriving()
}




// START DRIVING


function startDriving() {
    phase = 2


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Decoration
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.VisionBlock
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Enemy
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.RoadLine
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Goal
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Wall
    )


    distance = 0
    visionDamage = 0
    turtleHit = true
    canTakeDamage = true


    info.setLife(3)
    info.setScore(0)


    makeRoadBackground()


    player = sprites.create(
        carChoices[selectedCharacter],
        SpriteKind.Player
    )


    player.setPosition(
        80,
        95
    )


    player.setStayInScreen(
        true
    )


    controller.moveSprite(
        player,
        85,
        0
    )


    game.showLongText(
        "Drive to the hospital. Avoid traffic while you can still see the road.",
        DialogLayout.Bottom
    )


    damageScreen(12)
}




// ROAD LINES


function createRoadLine() {
    let lineImage = image.create(
        3,
        12
    )


    lineImage.fill(
        1
    )


    let line = sprites.create(
        lineImage,
        SpriteKind.RoadLine
    )


    if (randint(0, 1) == 0) {
        line.x = 61
    } else {
        line.x = 99
    }


    line.y = -5


    line.vy = 65


    line.setFlag(
        SpriteFlag.Ghost,
        true
    )


    line.setFlag(
        SpriteFlag.AutoDestroy,
        true
    )
}




// TRAFFIC


function createEnemyCar() {
    let enemy = sprites.create(
        enemyCarImage,
        SpriteKind.Enemy
    )


    let lane = randint(
        0,
        2
    )


    if (lane == 0) {
        enemy.x = 43
    } else if (lane == 1) {
        enemy.x = 80
    } else {
        enemy.x = 117
    }


    enemy.y = -15


    enemy.vy = randint(
        45,
        70
    )


    enemy.setFlag(
        SpriteFlag.AutoDestroy,
        true
    )
}




// SCREEN DAMAGE


function damageScreen(amount: number) {
    if (phase < 2 || phase >= 5) {
        return
    }


    visionDamage += amount


    if (visionDamage > 100) {
        visionDamage = 100
    }


    let numberOfBlocks = Math.floor(
        amount / 3
    )


    if (numberOfBlocks < 1) {
        numberOfBlocks = 1
    }


    for (let i = 0; i < numberOfBlocks; i++) {


        let width = randint(
            4,
            14
        )


        let height = randint(
            3,
            11
        )


        let blockImage = image.create(
            width,
            height
        )


        blockImage.fill(
            15
        )


        let block = sprites.create(
            blockImage,
            SpriteKind.VisionBlock
        )


        block.setPosition(
            randint(5, 155),
            randint(5, 115)
        )


        block.setFlag(
            SpriteFlag.RelativeToCamera,
            true
        )


        block.setFlag(
            SpriteFlag.Ghost,
            true
        )


        block.z = 100
    }


    if (visionDamage >= 90) {
        phase = 5


        controller.moveSprite(
            player,
            0,
            0
        )


        game.showLongText(
            "Your vision goes completely dark before you reach treatment.",
            DialogLayout.Full
        )


        game.over(
            false
        )
    }
}




// HOSPITAL PARKING LOT


function startParkingLot() {
    phase = 3


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Enemy
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.RoadLine
    )


    if (player) {
        player.destroy()
    }


    let bg = image.create(
        160,
        120
    )


    bg.fill(
        13
    )


    bg.fillRect(
        0,
        0,
        160,
        25,
        1
    )


    bg.fillRect(
        0,
        25,
        160,
        95,
        12
    )


    // Parking spaces


    for (let x = 15; x < 145; x += 30) {
        bg.drawLine(
            x,
            45,
            x,
            75,
            1
        )
    }


    bg.print(
        "HOSPITAL",
        55,
        8,
        2
    )


    bg.print(
        "ER",
        145,
        52,
        2
    )


    scene.setBackgroundImage(
        bg
    )


    player = sprites.create(
        playerChoices[selectedCharacter],
        SpriteKind.Player
    )


    player.setPosition(
        12,
        90
    )


    player.setStayInScreen(
        true
    )


    controller.moveSprite(
        player,
        55,
        55
    )


    makeParkingObstacle(
        55,
        35,
        20,
        12
    )


    makeParkingObstacle(
        55,
        85,
        20,
        12
    )


    makeParkingObstacle(
        95,
        58,
        20,
        12
    )


    makeParkingObstacle(
        125,
        90,
        20,
        12
    )


    goal = sprites.create(
        img`
        2 2 2 2 2 2 2 2 2 2 2 2
        2 1 1 1 1 1 1 1 1 1 1 2
        2 1 2 2 2 2 2 2 2 2 1 2
        2 1 2 1 1 1 1 1 1 2 1 2
        2 1 2 1 2 2 2 2 1 2 1 2
        2 1 2 1 2 2 2 2 1 2 1 2
        2 1 2 1 2 2 2 2 1 2 1 2
        2 1 2 1 1 1 1 1 1 2 1 2
        2 1 2 2 2 2 2 2 2 2 1 2
        2 1 1 1 1 1 1 1 1 1 1 2
        2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2
    `,
        SpriteKind.Goal
    )


    goal.setPosition(
        150,
        60
    )


    goal.setFlag(
        SpriteFlag.Ghost,
        true
    )


    game.showLongText(
        "You made it to the hospital. Get out of the car and reach the emergency entrance.",
        DialogLayout.Bottom
    )
}




// PARKING OBSTACLE


function makeParkingObstacle(
    x: number,
    y: number,
    width: number,
    height: number
) {
    let obstacleImage = image.create(
        width,
        height
    )


    obstacleImage.fill(
        8
    )


    obstacleImage.drawRect(
        0,
        0,
        width,
        height,
        1
    )


    let obstacle = sprites.create(
        obstacleImage,
        SpriteKind.Wall
    )


    obstacle.setPosition(
        x,
        y
    )
}




// HOSPITAL


function startHospital() {
    phase = 4


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Wall
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.Goal
    )


    let bg = image.create(
        160,
        120
    )


    bg.fill(
        1
    )


    bg.fillRect(
        0,
        0,
        160,
        8,
        9
    )


    bg.fillRect(
        0,
        112,
        160,
        8,
        9
    )


    bg.print(
        "EMERGENCY ROOM",
        40,
        4,
        2
    )


    bg.print(
        "FIND THE DOCTOR",
        38,
        106,
        8
    )


    scene.setBackgroundImage(
        bg
    )


    player.setPosition(
        15,
        95
    )


    controller.moveSprite(
        player,
        55,
        55
    )


    makeHospitalWall(
        42,
        28,
        8,
        56
    )


    makeHospitalWall(
        82,
        88,
        8,
        55
    )


    makeHospitalWall(
        122,
        30,
        8,
        60
    )


    goal = sprites.create(
        img`
        . . . . 9 9 9 9 . . . .
        . . . 9 9 9 9 9 9 . . .
        . . . d d d d d d . . .
        . . d d f d d f d d . .
        . . d d d d d d d d . .
        . . . d d d d d d . . .
        . . . . d d d d . . . .
        . . . . 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 . . .
        . . 1 1 1 2 2 1 1 1 . .
        . . 1 1 1 2 2 1 1 1 . .
        . . . 1 1 1 1 1 1 . . .
        . . . 1 . . . . 1 . . .
        . . . 1 . . . . 1 . . .
        . . 1 1 . . . . 1 1 . .
        . . . . . . . . . . . .
    `,
        SpriteKind.Goal
    )


    goal.setPosition(
        145,
        18
    )


    goal.setFlag(
        SpriteFlag.Ghost,
        true
    )


    game.showLongText(
        "The hospital halls are confusing and your vision keeps getting worse. Find the doctor.",
        DialogLayout.Bottom
    )
}




// HOSPITAL WALL


function makeHospitalWall(
    x: number,
    y: number,
    width: number,
    height: number
) {
    let wallImage = image.create(
        width,
        height
    )


    wallImage.fill(
        9
    )


    wallImage.drawRect(
        0,
        0,
        width,
        height,
        15
    )


    let wall = sprites.create(
        wallImage,
        SpriteKind.Wall
    )


    wall.setPosition(
        x,
        y
    )
}




// WIN


function winGame() {
    phase = 5


    controller.moveSprite(
        player,
        0,
        0
    )


    game.showLongText(
        "You found the doctor just in time!",
        DialogLayout.Full
    )


    game.showLongText(
        "The doctor treats your head injury and your vision slowly comes back.",
        DialogLayout.Bottom
    )


    sprites.destroyAllSpritesOfKind(
        SpriteKind.VisionBlock
    )


    game.showLongText(
        "You got the turtle you wished for. It just arrived a little differently than expected.",
        DialogLayout.Bottom
    )


    scene.cameraShake(
        2,
        500
    )


    game.over(
        true
    )
}




// BUTTON CONTROLS


controller.A.onEvent(
    ControllerButtonEvent.Pressed,
    function () {


        if (phase == 0) {


            selectedCharacter = 0


            showCharacterSelect()


        } else if (phase == 1) {


            openingCutscene()


        }
    })




controller.left.onEvent(
    ControllerButtonEvent.Pressed,
    function () {


        if (phase == 1) {


            selectedCharacter -= 1


            if (selectedCharacter < 0) {
                selectedCharacter = 2
            }


            showCharacterSelect()
        }
    })




controller.right.onEvent(
    ControllerButtonEvent.Pressed,
    function () {


        if (phase == 1) {


            selectedCharacter += 1


            if (selectedCharacter > 2) {
                selectedCharacter = 0
            }


            showCharacterSelect()
        }
    })




// CAR COLLISION


sprites.onOverlap(
    SpriteKind.Player,
    SpriteKind.Enemy,
    function (sprite, enemy) {


        if (phase != 2) {
            return
        }


        if (!canTakeDamage) {
            return
        }


        canTakeDamage = false


        enemy.destroy(
            effects.fire,
            100
        )


        scene.cameraShake(
            6,
            500
        )


        info.changeLifeBy(
            -1
        )


        damageScreen(
            8
        )


        sprite.startEffect(
            effects.fountain,
            300
        )


        pause(
            700
        )


        canTakeDamage = true
    })




// WALL COLLISION


sprites.onOverlap(
    SpriteKind.Player,
    SpriteKind.Wall,
    function (sprite, wall) {


        if (phase != 3 && phase != 4) {
            return
        }


        if (sprite.vx > 0) {
            sprite.x -= 4
        }


        if (sprite.vx < 0) {
            sprite.x += 4
        }


        if (sprite.vy > 0) {
            sprite.y -= 4
        }


        if (sprite.vy < 0) {
            sprite.y += 4
        }
    })




// GOAL COLLISION


sprites.onOverlap(
    SpriteKind.Player,
    SpriteKind.Goal,
    function (sprite, target) {


        if (phase == 3) {


            startHospital()


        } else if (phase == 4) {


            winGame()
        }
    })




// ROAD LINE SPAWNER


game.onUpdateInterval(
    300,
    function () {


        if (phase == 2) {
            createRoadLine()
        }
    })




// TRAFFIC SPAWNER


game.onUpdateInterval(
    900,
    function () {


        if (phase == 2) {
            createEnemyCar()
        }
    })




// DISTANCE SYSTEM


game.onUpdateInterval(
    1000,
    function () {


        if (phase != 2) {
            return
        }


        distance += 5


        info.setScore(
            distance
        )


        if (distance >= 100) {
            startParkingLot()
        }
    })




// VISION GETS WORSE


game.onUpdateInterval(
    3000,
    function () {


        if (
            turtleHit &&
            phase >= 2 &&
            phase <= 4
        ) {
            damageScreen(
                3
            )
        }
    })




// START


showHomeScreen()


