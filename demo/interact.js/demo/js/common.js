interact('.draggable').draggable({
    inertia: true,
    restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: {
            top: 0,
            left: 0,
            bottom: 1,
            right: 1
        }
    },
    onmove: dragMoveListener,
    onend: function(event) {
        var textEl = event.target.querySelector('p');
        textEl && (textEl.textContent = 'moved a distace of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
    }
});

function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
window.dragMoveListener = dragMoveListener;

interact('.dropzone').dropzone({
    accept:'#yes-drop',
    overlap:0.75,
    ondropactivate:function(event){
        event.target.classList.add('drop-active');
    },
    ondragenter:function(event){
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        draggableElement.textContent = "Dragged in";
    },
    ondragleave:function(event){
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.textContent = "Dragged out";
    },
    ondrop:function(event){
        event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate:function(event){
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
})