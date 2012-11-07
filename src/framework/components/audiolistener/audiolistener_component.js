pc.extend(pc.fw, function () {
    /**
    * @name pc.fw.AudioListenerComponent
    */
    var AudioListenerComponent = function () {
    };
    AudioListenerComponent = pc.inherits(AudioListenerComponent, pc.fw.Component);

    pc.extend(AudioListenerComponent.prototype, {
        setCurrentListener: function () {
            if (this.entity.audiolistener) {
                this.system.current = this.entity;
                var position = this.system.current.getPosition();
                this.system.manager.listener.setPosition(position);
            }
        },
    });

    return {
        AudioListenerComponent: AudioListenerComponent
    };
}());