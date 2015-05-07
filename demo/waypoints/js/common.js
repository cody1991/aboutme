var waypoint = new Waypoint({
    element: document.getElementById('waypoint'),
    handler: function(direction) {
        alert('Basic waypoint triggered', direction, this.element.id + ' triggers at ' + this.triggerPoint);
    },
    offset: '40px',
    context: document.getElementsByClassName('container')[0]
})


var waypoint2 = new Waypoint({
    element: document.getElementById('nav'),
    handler: function(direction) {
    	console.log(direction)
        if (direction === 'down') {
            this.element.style.position = 'fixed';
            this.element.style.top = '0px'
        }
        else{
        	this.element.style.position = 'static';
        }
    },
})
