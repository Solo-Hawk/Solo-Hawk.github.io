
/*
Make contraints to point not the node or target, (target is used for each node)
Make fields for each ship to break off core code for combat phase
Make ships controlled via node not individuals






*/
var game;
var boidsAmount = 400;
var boids = [];
var target;
var node;
var nodeTar;
var nodeAng = 123;
var nodeRng = 40;
var nodeRot = 20;
var boidSize = 0.1;
var boidSpeed = 600;
var boidForce = 275;
var boidForceS = 100;
var boidForceE = 150;
var xWay = 1;
window.onload = function () {
    game = new Phaser.Game(800, 800, Phaser.AUTO, "");
    game.state.add("Simulate", simulate);
    game.state.start("Simulate");
}
var simulate = function (game) {};
simulate.prototype = {
        preload: function () {
            game.load.image("boid", "Assets/Space%20shooter%20assets/PNG/playerShip1_blue.png")
            game.load.image("boid", "Assets/Space%20shooter%20assets/PNG/playerShip1_blue.png");
            game.load.image("target", "Assets/Space%20shooter%20assets/PNG/ufoRed.png");
        }
        , create: function () {
            node = game.add.sprite(game.width / 2, game.height / 2, "target");
            target = game.add.sprite(node.x, game.height / 2, "target");
            target.scale.setTo(0.05, 0.05)
            target.anchor.set(0.5);
            
            for (var i = 0; i < boidsAmount; i++) {
                var randomPoint = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
                boids[i] = game.add.sprite(randomPoint.x, randomPoint.y, "boid")
                boids[i].anchor.set(0.5);
                boids[i].speed = boidSpeed;
                boids[i].scale.setTo(boidSize, boidSize);
                boids[i].force = boidForce;
                boids[i].collideWorldBounds = true;
                game.physics.enable(boids[i], Phaser.Physics.ARCADE);
                boids[i].body.allowRotation = false;
            }
        }
        , update: function () {
            
            for(var x = 0; x < boidsAmount; x++){
                for(var i = 0; i < boidsAmount; i++){
                    game.physics.arcade.collide(boids[x], boids[i])
                    
                }
                
            }
            
            for (var i = 0; i < boidsAmount; i++) {
                // direction vector is the straight direction from the boid to the target
                var direction = new Phaser.Point(target.x, target.y);
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
                
            }
            
            if(nodeAng > 6000)
                {
                    nodeAng = 0;
                    node.x = game.rnd.between(100,game.width-100);
                    node.y = game.rnd.between(100,game.height-100);
                }
                target.x = node.x + (nodeRng * Math.cos(nodeAng)) + (nodeRng / 2)+26;
                target.y = node.y + (nodeRng * Math.sin(nodeAng)) + (nodeRng / 2)+26;
                nodeAng += nodeRot;
                
                }
        }