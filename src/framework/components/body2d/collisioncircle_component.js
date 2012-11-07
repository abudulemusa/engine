if (typeof(Box2D) !== 'undefined') {
    pc.extend(pc.fw, function () {
        // Unpack common Box2D code
        var b2World = Box2D.Dynamics.b2World;
        var b2Vec2 = Box2D.Common.Math.b2Vec2;
        var b2Body = Box2D.Dynamics.b2Body;
        var b2BodyDef = Box2D.Dynamics.b2BodyDef;
        var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
        var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
        var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

        // Shared vectors to avoid excessive allocation
        var position = pc.math.vec3.create();
        var rotation = pc.math.vec3.create();
        var scale = pc.math.vec3.create(1, 1, 1);
        var transform = pc.math.mat4.create();

        var pos2d = new b2Vec2();

        /**
         * @private
         * @name pc.fw.CollisionCircleComponent
         * @constructor Create a new CollisionCircleComponent
         * @class 
         * @param {Object} context
         * @extends pc.fw.Component
         */
        var CollisionCircleComponent = function CollisionCircleComponent () {
            // Indexes for converting between 2D and 3D co-ords
            this.xi = 0; // 3D index that corresponds to 2D x-axis
            this.yi = 2; // 3D index that corresponds to 2D y-axis
            this.ri = 1; // 3D index that corresponds to the rotation axis

            this.bind('set_density', this.onSetDensity.bind(this));
            this.bind('set_friction', this.onSetFriction.bind(this));
            this.bind('set_restitution', this.onSetRestitution.bind(this));
            this.bind('set_radius', this.onSetRadius)
        };
        CollisionCircleComponent = pc.inherits(CollisionCircleComponent, pc.fw.Component);
        
        pc.extend(CollisionCircleComponent.prototype, {
            onSetDensity: function (name, oldValue, newValue) {
                if (!this.entity.body2d) {
                    return;
                }

                var body = this.entity.body2d.body;
                if (body) {
                    // We only support a single fixture at the moment
                    var fixture = body.GetFixtureList();
                    fixture.SetDensity(newValue);

                    // Update the body with changes
                    body.ResetMassData();
                }                
            },

            onSetFriction: function (name, oldValue, newValue) {
                if (!this.entity.body2d) {
                    return;
                }

                var body = this.entity.body2d.body;
                if (body) {
                    // We only support a single fixture at the moment
                    var fixture = body.GetFixtureList();
                    fixture.SetFriction(newValue);

                    // Update the body with changes
                    body.ResetMassData();
                }                
            },

            onSetRestitution: function (name, oldValue, newValue) {
                if (!this.entity.body2d) {
                    return;
                }

                var body = this.entity.body2d.body;
                if (body) {
                    // We only support a single fixture at the moment
                    var fixture = body.GetFixtureList();
                    fixture.SetRestitution(newValue);

                    // Update the body with changes
                    body.ResetMassData();
                }                
            },

            onSetRadius: function (name, oldValue, newValue) {
                if (!this.entity.body2d) {
                    return;
                }

                var body = this.entity.body2d.body;
                if (body) {
                    var fixture = body.GetFixtureList();
                    var shape = fixture.GetShape();
                    
                    shape.SetRadius(this.radius);

                    body.SetAwake(true);
                }
            }
        });

        return {
            CollisionCircleComponent: CollisionCircleComponent
        };
    }());
}