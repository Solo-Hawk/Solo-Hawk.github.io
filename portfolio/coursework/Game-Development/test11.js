/*
Make contraints to point not the node or target, (target is used for each node)
Make fields for each ship to break off core code for combat phase
Make ships controlled via node not individuals
*/
//Creating Game
//
//
var game;
// Current prototype constraints
//
//
var limit = 100;
var line;
var boidsAmount = limit;
var hostileboids = limit;
//
//
// Tick Count for Game time
//
//
var tick = 0;
//
//
// Player controls ---------- USER INPUT
//
//
var pointer;
var selectBox;
var selectArea;
var inputState;
var selections;
var captureOrigin = false;
var captureX;
var captureY;
var selected = 0;
var selectType;
var selectedNode;
var selectedShips;
//
//
// Empty Arrays for boid sets (This is because the classes system was too complex to do quickly while learning)
//Game core arrays
//
//
var shoot = [];
//
//
// Boids for Player
//
//
var boids = [];
var bfield = [];
var bnode = [];
var btarget = [];
var bfire = [];
var bSeleted = [];
//
//
// Boids for Computer
//
//
var hboids = [];
var hfield = [];
var hnode = [];
var htarget = [];
var hfire = [];
var desRate = 100; // Amount of time per decision (Ticks to (*3))
var hmove = 200; // Making next hmove mark
//
//
// Nodes for all Boids
//
//
var target = [];
var node = [];
//
//
// Turrets to defend base nodes and base objects
//
//
var bbase
var hbase
//
//
// Variables for Randoms
//
//
var rndn;
var rndh;
//
//
// Check Vars
//
//
var fireCheck = false;
//
//
// Main Constraints for both boids and nodes
//
//
//nodes
//
//
var spawnRad = 50;
var nodeAng = 123;
var nodeRng = 40;
var nodeRot = 3;
//
//
//boid respawn
//
//
var respawnRate = 240;
var respawnWave = 120;
var brno = 0;
var hrno = 0;
var bWave = 5;
var hWave = 5;
//
//
// boid variables
//
//
var boidSize = 0.2;
var boidSpeed = 350;
var boidRange = 133;
//
//
// Fixed Zone
//
//
var boidForce = 166;
//
//
// Random Zone
//
//
var boidForceS = 100;
var boidForceE = 150;
//
//
// Fire Rate (Ticks)
//
//
var fireRate = 40;
//
//
// Laser lifespan
//
//
var laserlife = 2;
//
//
// Misc vars
//
//
var xWay = 1;
//
//
// Defining available Assets
//
//
var goodShips = ["boid1", "boid2", "boid3"];
var badShips = ["hboid1", "hboid2", "hboid3"];
//
//
// Prototype mapping
//
//
var nodes;
var map;
var maplinks;
var connector;

function createMap(game) {
    nodes = 9;
    map = [
             [50, 50]
            , [((game.width / 32) * 12) - 45, ((game.height / 20) * 7) - 45]
            , [((game.width / 32) * 16) - 45, ((game.height / 20) * 4) - 45]
            , [((game.width / 32) * 20) - 45, ((game.height / 20) * 7) - 45]
            , [(game.width / 2) - 45, (game.height / 2) - 45]
            , [((game.width / 32) * 20) - 45, ((game.height / 20) * 13) - 45]
            , [((game.width / 32) * 16) - 45, ((game.height / 20) * 16) - 45]
            , [((game.width / 32) * 12) - 45, ((game.height / 20) * 13) - 45]
            , [game.width - 141, game.height - 141]
    ];
    maplinks = [
                      [1, 2]
                    , [0, 4, 7]
                    , [0, 4, 3]
                    , [2, 5]
                    , [1, 2, 5, 6]
                    , [3, 4, 8]
                    , [4, 7, 8]
                    , [1, 6]
                    , [5, 6]
                   ]
    mapHPrior = [
                      [50, 50]
                    , [70, 20, 10]
                    , [60, 30, 10]
                    , [90, 10]
                    , [40, 40, 10, 10]
                    , [45, 45, 10]
                    , [60, 30, 10]
                    , [70, 30]
                    , [50, 50]
                ]
}
window.onload = function () {
    game = new Phaser.Game("99%", "99%", Phaser.AUTO, "");
    game.state.add("Simulate", simulate);
    game.state.start("Simulate");
}
var simulate = function (game) {};
simulate.prototype = {
    preload: preload,
    create: create,
    update: update,
    render: render
}

function preload() {
    {
        createMap(game);
        //Loading all required assets
        //Player Ships
        game.load.image("boid1", "Assets/Space%20shooter%20assets/PNG/playerShip1_blue.png");
        game.load.image("boid2", "Assets/Space%20shooter%20assets/PNG/playerShip2_blue.png");
        game.load.image("boid3", "Assets/Space%20shooter%20assets/PNG/playerShip3_blue.png");
        //AI Ships
        game.load.image("hboid1", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed1.png");
        game.load.image("hboid2", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed2.png");
        game.load.image("hboid3", "Assets/Space%20shooter%20assets/PNG/Enemies/enemyRed3.png");
        // Laser Effects
        game.load.image("bLaser", "Assets/Space%20shooter%20assets/PNG/Lasers/rsz_laserblue01.png")
        game.load.image("hLaser", "Assets/Space%20shooter%20assets/PNG/Lasers/rsz_laserred01.png")
        // "Nodes"
        game.load.spritesheet("target", "Assets/Space%20shooter%20assets/PNG/Nodes.png", 91, 91);
        // Laser Audio
        game.load.audio("laser1", "Assets/Audio/laser1.ogg");
        game.load.audio("laser2", "Assets/Audio/laser2.ogg");
        game.load.audio("laser3", "Assets/Audio/laser3.ogg");
        game.load.audio("laser4", "Assets/Audio/laser4.ogg");
        game.load.audio("laser5", "Assets/Audio/laser5.ogg");
        game.load.audio("laser6", "Assets/Audio/laser6.ogg");
        game.load.audio("laser7", "Assets/Audio/laser7.ogg");
        game.load.audio("laser8", "Assets/Audio/laser8.ogg");
        game.load.audio("laser9", "Assets/Audio/laser9.ogg");
    }
}

function create() {
    pointer = new Phaser.Pointer(game, 0)
    shoot[0] = game.add.audio("laser1");
    shoot[1] = game.add.audio("laser2");
    shoot[2] = game.add.audio("laser3");
    shoot[3] = game.add.audio("laser4");
    shoot[4] = game.add.audio("laser5");
    shoot[5] = game.add.audio("laser6");
    shoot[6] = game.add.audio("laser7");
    shoot[7] = game.add.audio("laser8");
    shoot[8] = game.add.audio("laser9");
    selectArea = new Phaser.Rectangle(0, 0, 0, 0);
    inputState = "mouseUp";
    //game map
    /*map = [
             [100, 100]
           , [(game.width / 4) - 45, (game.height / 4) - 45]
           , [(game.width / 2) - 45, (game.height / 2) - 45]
           , [((game.width / 4) * 3) - 45, ((game.height / 4) * 3) - 45]
           , [game.width - 191, game.height - 191]
    ]*/
    // Inital setting of randomized not target for boids
    connector = game.add.graphics(0, 0)
    connector.lineStyle(2, 0xffff33, 1)
    for (var x = 0; x < nodes; x++) {
        for (var i = 0; i < maplinks[x].length; i++) {
            connector.moveTo(map[x][0] + 43, map[x][1] + 43)
            connector.lineTo(map[maplinks[x][i]][0] + 43, map[maplinks[x][i]][1] + 43)
        }
    }
    rndn = game.rnd.between(0, nodes - 1);
    rndh = game.rnd.between(0, nodes - 1);
    for (var x = 0; x < (nodes); x++) {
        // Creating each Node and assigning 'boundary'
        node[x] = game.add.sprite(map[x][0], map[x][1], "target");
        node[x].animations.add('N', [0], 0, false)
        node[x].animations.add('F', [1], 0, false)
        node[x].animations.add('H', [2], 0, false)
        node[x].inputEnabled = true;
        target[x] = game.add.sprite(node.x, game.height / 2, "target");
        target[x].scale.setTo(0.05, 0.05)
        target[x].anchor.set(0.5);
    }
    for (var i = 0; i < boidsAmount; i++) { // deploying each friendly boid
        var randX = game.rnd.between(-50, 50);
        var randY = game.rnd.between(-50, 50);
        // Detection field for each ship
        bfield[i] = new Phaser.Circle(0, 0, boidRange);
        // Boid ship creation
        boids[i] = game.add.sprite(node[0].x, node[0].y, goodShips[game.rnd.between(0, 2)])
        boids[i].anchor.set(0.5);
        boids[i].speed = boidSpeed;
        boids[i].scale.setTo(boidSize, boidSize);
        boids[i].force = boidForce;
        boids[i].collideWorldBounds = true;
        game.physics.enable(boids[i], Phaser.Physics.ARCADE);
        boids[i].body.allowRotation = false;
        // Target Management
        btarget[i] = false;
        bfire[i] = 0;
        bnode[i] = 0;
        boids[i].kill();
        boids[i].visible = true
        boids[i].exists = true;
        boids[i].x = node[0].x + randX - 400;
        boids[i].y = node[0].y + randY - 400;
    }
    for (var i = 0; i < hostileboids; i++) { // deploying each hostile boid
        var randX = game.rnd.between(-50, 50);
        var randY = game.rnd.between(-50, 50);
        // Detection field for each ship
        hfield[i] = new Phaser.Circle(0, 0, boidRange);
        // Boid ship creation
        hboids[i] = game.add.sprite(node[nodes - 1].x, node[nodes - 1].y, badShips[game.rnd.between(0, 2)])
        hboids[i].anchor.set(0.5);
        hboids[i].speed = boidSpeed;
        hboids[i].scale.setTo(boidSize, boidSize);
        hboids[i].force = boidForce;
        hboids[i].collideWorldBounds = true;
        game.physics.enable(hboids[i], Phaser.Physics.ARCADE);
        hboids[i].body.allowRotation = false;
        // Target Managment
        htarget[i] = false;
        hfire[i] = 0;
        hnode[i] = nodes - 1;
        hboids[i].kill();
        hboids[i].visible = true;
        hboids[i].exists = true;
        hboids[i].x = node[nodes - 1].x + randX + 400;
        hboids[i].y = node[nodes - 1].y + randY + 400;
    }
}

function update() {
    //Making same ship groups not collide
    game.physics.arcade.collide(boids, boids)
    game.physics.arcade.collide(hboids, hboids)
    // Managing player input
    if (game.input.activePointer.isDown && selectType != "pickingNode") {
        if (game.input.activePointer.duration < 100) {
            console.log("FLAG");
            captureX = game.input.activePointer.x;
            captureY = game.input.activePointer.y;
        }
        inputState = "mouseDown";
        selectType = "node";
        if (game.input.activePointer.duration > 120 && (game.input.activePointer.x > (captureX + 20) || game.input.activePointer.x < (captureX - 20)) && (game.input.activePointer.y > (captureY + 20) || game.input.activePointer.y < (captureY - 20))) {
            inputState = "Selecting Multiple";
            selectType = "ships"
        } else {}
    } else {
        if (selectType == "node" || selectType == "pickingNode") {
            selectedNode = -1
            for (var x = 0; x < nodes; x++) {
                if (node[x].input.pointerOver()) {
                    selectedNode = x
                    console.log("pointer over : " + x + "  =  " + node[x].input.pointerOver())
                }
            }
            if (selectType == "pickingNode" && game.input.activePointer.isDown) {
                for (var x = 0; x < limit; x++) {
                    console.log(bnode[x])
                    for (var z = 0; z < maplinks[bnode[x]].length; z++) {



                        if (selectedNode != -1 && bSeleted[x] && maplinks[bnode[x]][z] == selectedNode) {
                            bnode[x] = selectedNode
                        }
                    }
                    selectType = "none"
                }
            } else if (selectType == "node") {
                selectArea.x = captureX - 50;
                selectArea.y = captureY - 50;
                selectArea.width = 100
                selectArea.height = 100
                selectArea.lifespan = 5
                console.log("flag")
                game.debug.geom(selectArea, '#0fffff')
                for (var x = 0; x < limit; x++) {
                    if (checkSelected(boids[x], selectArea)) {
                        selected += 1;
                        bSeleted[x] = true
                    }
                }
                selectArea.lifespan = 5



                selectType = "pickingNode"
            }
        } else if (selectType == "ships") {
            selectArea.x = captureX;
            selectArea.y = captureY;
            selectArea.width = game.input.activePointer.x - captureX
            selectArea.height = game.input.activePointer.y - captureY
            if (selectArea.width < 0) {
                selectArea.width *= -1;
                selectArea.x -= selectArea.width;
            }
            if (selectArea.height < 0) {
                selectArea.height *= -1;
                selectArea.y -= selectArea.height;
            }
            game.debug.geom(selectArea, '#0fffff')
            for (var x = 0; x < limit; x++) {
                if (checkSelected(boids[x], selectArea)) {
                    selected += 1;
                    bSeleted[x] = true
                }
            }
            //selectArea.destroy();
            selectType = "pickingNode"
        } else {}
        if (selectType != "pickingNode") {
            inputState = "mouseUp";
            captureOrigin = false
            selectType = "none"
        }
    }
    //end of managing input
    // respawn manager
    if (respawnWave < tick) {
        handleRespawn(game);
    }
    //managing boid movement
    for (var i = 0; i < limit; i++) {
        if (boids[i].alive) {
            // direction vector is the straight direction from the boid to the target
            var direction = new Phaser.Point(target[bnode[i]].x, target[bnode[i]].y);
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
            if (selectType == "none") {
                bSeleted[i] = false;
            } else {
                if (bSeleted[i] == true) {
                    game.debug.body(boids[i])
                }
            }
        } else {
            boids[i].visible = false;
        }
        if (hboids[i].alive) {
            if (tick > hmove) {
                var rHun = game.rnd.between(1, 99);
                var grab;
                var stack = 0;
                for (var x = 0; x < maplinks[hnode[i]].length; x++) {
                    //console.log("Randon: " + rHun);
                    stack += mapHPrior[hnode[i]][x];
                    //console.log("Value: "+stack);
                    //console.log(x)
                    if (stack > rHun) {
                        //conbodysole.log("des")
                        grab = x;
                        break
                    }
                }
                var selector = maplinks[hnode[i]][grab];
                //console.log(selector)
                hnode[i] = selector;
            }
            // direction vector is the straight direction from the boid to the target
            var direction = new Phaser.Point(target[hnode[i]].x, target[hnode[i]].y);
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
            hboids[i].angle = 90 + Phaser.Math.radToDeg(Phaser.Point.angle(hboids[i].position, new Phaser.Point(hboids[i].x + hboids[i].body.velocity.x, hboids[i].y + hboids[i].body.velocity.y)));
            //game.debug.geom(hfield[i], '#ffffcc');
            //debug drawing
            hfield[i].x = hboids[i].x;
            hfield[i].y = hboids[i].y;
            var navLine = new Phaser.Line(hboids[i].x, hboids[i].y, target[hnode[i]].x, target[hnode[i]].y);
            //game.debug.geom(navLine);
        } else {
            hboids[i].visible = false;
        }
    }
    for (var i = 0; i < limit; i++) {
        for (var x = 0; x < limit; x++) {
            var randX = game.rnd.between(-50, 50);
            var randY = game.rnd.between(-50, 50);
            if (checkOverlap(bfield[i], hboids[x]) && hboids[x].alive && boids[i].alive && tick > bfire[i]) {
                var line1 = new Phaser.Line(boids[i].x, boids[i].y, hboids[x].x, hboids[x].y);
                //game.debug.geom(hfield[i], '#ffffcc');
                //game.debug.geom(bfield[i], '#cfffff');
                //game.debug.geom(line1)
                var shot = game.add.sprite(boids[i].x, boids[i].y, "bLaser");
                shot.rotation = line1.angle - 90;
                shot.lifespan = laserlife;;
                shoot[game.rnd.between(0, 8)].play();
                hboids[x].kill();
                hboids[x].visible = true;
                hboids[x].x = node[nodes - 1].x + randX + 400
                hboids[x].y = node[nodes - 1].y + randY + 400
                //hboids[x].visible = false;
                fireCheck = true;
                bfire[i] = tick + fireRate;
            }
            if (checkOverlap(hfield[i], boids[x]) && boids[x].alive && hboids[i].alive && tick > hfire[i]) {
                var line2 = new Phaser.Line(hboids[i].x, hboids[i].y, boids[x].x, boids[x].y);
                //game.debug.geom(hfield[i], '#ffffcc');
                //game.debug.geom(bfield[i], '#cfffff');
                //game.debug.geom(line2)
                var shot = game.add.sprite(hboids[i].x, hboids[i].y, "hLaser");
                shot.rotation = line2.angle - 90;
                shot.lifespan = laserlife;
                shoot[game.rnd.between(0, 8)].play();
                boids[x].kill();
                boids[x].visible = true;
                boids[x].x = node[0].x + randX - 400
                boids[x].y = node[0].y + randY - 400
                //boids[x].visible = false;
                fireCheck = true;
                hfire[i] = tick + fireRate;
            }
            fireCheck = false;
            if (fireCheck) {
                break
            }
        }
    }
    if (tick > hmove) {
        hmove += game.rnd.between(desRate, desRate * 3)
    }
    // Reset point 
    if (nodeAng > 600) {
        nodeAng = 0;
        /*for (var x = 0; x < node.length; x++) {
            node[x].x = game.rnd.between(100, game.width - 100);
            node[x].y = game.rnd.between(100, game.height - 100);
        }*/
        rndn = game.rnd.between(0, nodes - 1);
        //rndh = game.rnd.between(0, nodes - 1);
    }
    //game.debug.geom(hfield, '#ffffcc');
    //game.debug.geom(bfield, '#ccffff');
    tick += 1
    for (var x = 0; x < node.length; x++) {
        target[x].x = node[x].x + (nodeRng * Math.cos(nodeAng)) + (nodeRng / 2) + 26;
        target[x].y = node[x].y + (nodeRng * Math.sin(nodeAng)) + (nodeRng / 2) + 26;
    }
    nodeAng += nodeRot;
    //boids[game.rnd.between(0, boidsAmount - 1)].kill();
    //hboids[game.rnd.between(0, hostileboids - 1)].kill();
    //selectBox.clear();
    if (selectType == "none") {
        //selectBox.clear()
    }
    for (var x = 0; x < nodes; x++) {
        var fTouchingNode = false
        var hTouchingNode = false
        for (var i = 0; i < limit; i++) {
            if (checkOverlap(boids[i], node[x])) {
                fTouchingNode = true
            }
            if (checkOverlap(hboids[i], node[x])) {
                hTouchingNode = true
            }

        }
        if (fTouchingNode && !hTouchingNode) {
            node[x].animations.play('F')
        } else if (!fTouchingNode && hTouchingNode) {
            node[x].animations.play('H')
        } else {
            node[x].animations.play('N')
        }


    }


}

function render() {
    if (false){
    game.debug.text(("Tick: " + tick), 100, game.height - 200);
    game.debug.text(("Respawnwave: " + respawnWave), 100, game.height - 180)
    game.debug.text(("Next AI Decision:" + hmove), 100, game.height - 160)
    game.debug.text(("Mouse State:" + inputState), 100, game.height - 140)
    game.debug.pointer(game.input.mousePointer);
    game.debug.pointer(game.input.pointer1);
    game.debug.text(game.input.activePointer.isDown, 100, game.height - 120);
    game.debug.text(("CaptureX: " + captureX + "  CaptureY: " + captureY), 100, game.height - 100);
    game.debug.text(("Select Type: " + selectType), 100, game.height - 80);
    game.debug.text(("Select Node: " + selectedNode), 100, game.height - 60);
    game.debug.text(("Selected Ships: " + selectedShips + " Selector Count: " + selected), 100, game.height - 40);
    game.debug.text(("SelectX: " + selectArea.width + " SelectY: " + selectArea.height), 100, game.height - 20);
    //game.debug.text(selectArea,300,300);
    }
    //rendering select box
    if (game.input.activePointer.isDown && selectType == "ships") { //&& selectType == "ships"
        //console.log("Check")
        selectArea.x = captureX;
        selectArea.y = captureY;
        selectArea.width = game.input.activePointer.x - captureX
        selectArea.height = game.input.activePointer.y - captureY
        selectBox = game.add.graphics(0, 0);
        selectBox.lineStyle(3, 0x00ff00, 1);
        selectBox.drawRect(captureX, captureY, selectArea.width, selectArea.height);
        selectBox.lifespan = 5;
    } else {}
}

function handleRespawn(game) {
    var bres = false;
    var hres = false;

    for (var i = 0; i < limit; i++) {
        var randX = game.rnd.between(-50, 50);
        var randY = game.rnd.between(-50, 50);
        if (hboids[i].alive == false && !hres && hrno < hWave) {
            hboids[i].alive = true;
            hboids[i].exists = true;
            hboids[i].visible = true;
            hboids[i].x -= 400
            hboids[i].y -= 400
            hnode[i] = nodes - 1
            hres = true;
            hrno += 1
        }
        if (boids[i].alive == false && !bres && brno < bWave) {
            boids[i].alive = true;
            boids[i].exists = true;
            boids[i].visible = true;
            boids[i].x += 400
            boids[i].y += 400
            bnode[i] = 0;
            bres = true;
            brno += 1
        }
        if (bres && hres) {
            break
        }
    }
    if (brno == bWave && hrno == hWave) {
        respawnWave += respawnRate;
        brno = 0;
        hrno = 0;

    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds()
    var boundsB = spriteB.getBounds()
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function checkSelected(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    return Phaser.Rectangle.intersects(boundsA, spriteB);
}

function moveCentralNodes() {}
