var waypoint = new Waypoint({
    element: document.getElementById('waypoint'),
    handler: function(direction) {
        alert('Basic waypoint triggered', direction, this.element.id + ' triggers at ' + this.triggerPoint);
    },
    offset: '40px',
    context:document.getElementsByClassName('container')[0]
})
