/*
Make contraints to point not the node or target, (target is used for each node)
Make fields for each ship to break off core code for combat phase
Make ships controlled via node not individuals






*/
//Creating Game
var game;
// Current prototype constraints
var limit = 40;
var line;
var boidsAmount = limit;
var hostileboids = limit;
var nodes = 5;
// Tick Count for Game time
var tick = 0;
// Empty Arrays for boid sets (This is because the classes system was too complex to do quickly while learning)
var boids = [];
var bfield = [];
var btarget = [];
var hboids = [];
var hfield = [];
var htarget = [];
var target = [];
var node = [];
var rndn;
var rndh;
// Main Constraints
var nodeAng = 123;
var nodeRng = 40;
var nodeRot = 3;
var boidSize = 0.1;
var boidSpeed = 300;
// Fixed Zone
var boidForce = 166;
// Random Zone
var boidForceS = 100;
var boidForceE = 150;
var xWay = 1;
// Defining available Assets
var goodShips = ["boid1", "boid2", "boid3"]
var badShips = ["hboid1", "hboid2", "hboid3"]
    // Prototype mapping
var map = [[100, 100], [400, 400], [], [], []]
window.onload = function () {
    game = new Phaser.Game(1700, 800, Phaser.AUTO, "");
    game.state.add("Simulate", simulate);
    game.state.start("Simulate");
}
var simulate = function (game) {};
simulate.prototype = {
    preload: preload
    , create: create
    , update: update
}

function preload() {
    {
        //Loading all required assets
        game.load.image("boid1", "Assets/Space%20shooter%20assets/PNG/playerShip1_blue.png");
        game.load.image("boid2", "Assets/Space%20shooter%20assets/PNG/playerShip2_blue.png");
        game.load.image("boid3", "Assets/Space%20shooter%20assets/PNG/playerShip3_blue.png");
        game.load.image("hboid1", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed1.png");
        game.load.image("hboid2", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed2.png");
        game.load.image("hboid3", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed3.png");
        game.load.image("target", "Assets/Space%20shooter%20assets/PNG/ufoYellow.png");
    }
}

function create() {
    // Inital setting of randomized not target for boids
    rndn = game.rnd.between(0, nodes - 1);
    rndh = game.rnd.between(0, nodes - 1);
    for (var x = 0; x < nodes; x++) {
        // Creating each Node and assigning 'boundary'
        node[x] = game.add.sprite(game.rnd.between(100, game.width - 100), game.rnd.between(100, game.height - 100), "target");
        target[x] = game.add.sprite(node.x, game.height / 2, "target");
        target[x].scale.setTo(0.05, 0.05)
        target[x].anchor.set(0.5);
    }
    for (var i = 0; i < boidsAmount; i++) { // deploying each friendly boid
        var randomPoint = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
        // Detection field for each ship
        bfield[i] = new Phaser.Circle(0, 0, 80);
        // Boid ship creation
        boids[i] = game.add.sprite(randomPoint.x, randomPoint.y, goodShips[game.rnd.between(0, 2)])
        boids[i].anchor.set(0.5);
        boids[i].speed = boidSpeed;
        boids[i].scale.setTo(boidSize, boidSize);
        boids[i].force = boidForce;
        boids[i].collideWorldBounds = true;
        game.physics.enable(boids[i], Phaser.Physics.ARCADE);
        boids[i].body.allowRotation = false;
        // Target Management
        btarget[i] = false;
    }
    for (var i = 0; i < hostileboids; i++) { // deploying each hostile boid
        var randomPoint = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
        // Detection field for each ship
        hfield[i] = new Phaser.Circle(0, 0, 80);
        // Boid ship creation
        hboids[i] = game.add.sprite(randomPoint.x, randomPoint.y, badShips[game.rnd.between(0, 2)])
        hboids[i].anchor.set(0.5);
        hboids[i].speed = boidSpeed;
        hboids[i].scale.setTo(boidSize, boidSize);
        hboids[i].force = boidForce;
        hboids[i].collideWorldBounds = true;
        game.physics.enable(hboids[i], Phaser.Physics.ARCADE);
        hboids[i].body.allowRotation = false;
        // Target Managment
        htarget[i] = false;
    }
}

function update() {
    //Making same ship groups not collide
    game.physics.arcade.collide(boids, boids)
    game.physics.arcade.collide(hboids, hboids)
    for (var i = 0; i < boidsAmount; i++) {
        // direction vector is the straight direction from the boid to the target
        var direction = new Phaser.Point(target[rndn].x, target[rndn].y);
        // now we subtract the current boid position
        direction.subtract(boids[i].x, boids[i].y);
        // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
        direction.normalize();
        // time to set magnitude (length) to boid speed
        direction.setMagnitude(boids[i].speed);
        // now we subtract the current boid velocity
        direction.subtract(boids[i].body.velocity.x * 2, boids[i].body.velocity.y * 2);
        // normalizing again
        direction.normalize();
        // finally we set the magnitude to boid force, which should be WAY lower than its velocity
        direction.setMagnitude(boids[i].force);
        // Now we add boid direction to current boid velocity
        boids[i].body.velocity.add(direction.x, direction.y);
        // we normalize the velocity
        boids[i].body.velocity.normalize();
        // we set the magnitue to boid speed
        boids[i].body.velocity.setMagnitude(boids[i].speed);
        boids[i].angle = -90 + Phaser.Math.radToDeg(Phaser.Point.angle(boids[i].position, new Phaser.Point(boids[i].x + boids[i].body.velocity.x, boids[i].y + boids[i].body.velocity.y)));
        //game.debug.geom(bfield[i], '#cfffff');
        //debug drawing
        bfield[i].x = boids[i].x;
        bfield[i].y = boids[i].y;
        
    }
    for (var i = 0; i < hostileboids; i++) {
        // direction vector is the straight direction from the boid to the target
        var direction = new Phaser.Point(target[rndh].x, target[rndh].y);
        // now we subtract the current boid position
        direction.subtract(hboids[i].x, hboids[i].y);
        // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
        direction.normalize();
        // time to set magnitude (length) to boid speed
        direction.setMagnitude(hboids[i].speed);
        // now we subtract the current boid velocity
        direction.subtract(hboids[i].body.velocity.x * 2, hboids[i].body.velocity.y * 2);
        // normalizing again
        direction.normalize();
        // finally we set the magnitude to boid force, which should be WAY lower than its velocity
        direction.setMagnitude(hboids[i].force);
        // Now we add boid direction to current boid velocity
        hboids[i].body.velocity.add(direction.x, direction.y);
        // we normalize the velocity
        hboids[i].body.velocity.normalize();
        // we set the magnitue to boid speed
        hboids[i].body.velocity.setMagnitude(hboids[i].speed);
        hboids[i].angle = -90 + Phaser.Math.radToDeg(Phaser.Point.angle(hboids[i].position, new Phaser.Point(hboids[i].x + hboids[i].body.velocity.x, hboids[i].y + hboids[i].body.velocity.y)));
        //game.debug.geom(hfield[i], '#ffffcc');
        //debug drawing
        hfield[i].x = hboids[i].x;
        hfield[i].y = hboids[i].y;
        for (var x = 0; x < boidsAmount; x++) {
            if (checkOverlap(hfield[i], boids[x]) && boids[x].alive) {
                var line = new Phaser.Line(hboids[i].x, hboids[i].y, boids[x].x, boids[x].y);
                game.debug.geom(hfield[i], '#ffffcc');
                game.debug.geom(bfield[i], '#cfffff');
                game.debug.geom(line)
                line.destroy;
                boids[x].x = -100;
                boids[x].y = -100;
                boids[x].kill();
                break
            }
        }
    }
    for (var i = 0; i < boidsAmount; i++){
        
        for (var x = 0; x < hostileboids; x++) {
            if (checkOverlap(bfield[i], hboids[x]) && hboids[x].alive) {
                line = new Phaser.Line(boids[i].x, boids[i].y, hboids[x].x, hboids[x].y);
                game.debug.geom(hfield[i], '#ffffcc');
                game.debug.geom(bfield[i], '#cfffff');
                game.debug.geom(line)
                line.destroy;
                hboids[x].kill();
                hboids[x].x = -100;
                hboids[x].y = -100;
                break
            }
        }
        for (var x = 0; x < boidsAmount; x++) {
            if (checkOverlap(hfield[i], boids[x]) && boids[x].alive) {
                var line = new Phaser.Line(hboids[i].x, hboids[i].y, boids[x].x, boids[x].y);
                game.debug.geom(hfield[i], '#ffffcc');
                game.debug.geom(bfield[i], '#cfffff');
                game.debug.geom(line)
                line.destroy;
                
                boids[x].kill();
                boids[x].x = -100;
                boids[x].y = -100;
                break
            }
        }
    }
    
    
    
    
    
    // Reset point 
    if (nodeAng > 600) {
        nodeAng = 0;
        for (var x = 0; x < node.length; x++) {
            node[x].x = game.rnd.between(100, game.width - 100);
            node[x].y = game.rnd.between(100, game.height - 100);
        }
        rndn = game.rnd.between(0, nodes - 1);
        rndh = game.rnd.between(0, nodes - 1);
        tick = 0
    }
    game.debug.geom(hfield, '#ffffcc');
    game.debug.geom(bfield, '#cfffff');
    tick += 1
    for (var x = 0; x < node.length; x++) {
        target[x].x = node[x].x + (nodeRng * Math.cos(nodeAng)) + (nodeRng / 2) + 26;
        target[x].y = node[x].y + (nodeRng * Math.sin(nodeAng)) + (nodeRng / 2) + 26;
    }
    nodeAng += nodeRot;
    //boids[game.rnd.between(0, boidsAmount - 1)].kill();
    //hboids[game.rnd.between(0, hostileboids - 1)].kill();
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}