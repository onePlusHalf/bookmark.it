let activeNav= 'choresList';
function updateDivColors(className) {
    // activeNav = 'choresList';
    if(className !== activeNav) {
    //
        var li = document.getElementsByClassName(className)[0];
        li.className = className+" active";
        console.log(li);
        // li.style.backgroundColor = 'pink';
        document.getElementsByClassName(activeNav)[0].className = activeNav;
        activeNav = className;
    }

}

function renderParent() {
    document.getElementsByClassName('parent')[0].style.display = 'flex';
    document.getElementsByClassName('parent')[0].style['flex-direction'] = 'column';

    document.getElementsByClassName('loader')[0].style.display = 'none';
}

var draggedId,
    droppedId,
    keys = [];

console.log('Script file successfully loaded.');

document.addEventListener('dragstart', function drag(event) {
    console.log('dragstart', event.target.id);
    console.log('dragstart event', event);
    draggedId = event.target.id;
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener('drop', function drop(event) {
    if (event.target.id && event.target.id != draggedId) {
        droppedId = event.target.id;
        updateKeys();

        console.log('droppedId', droppedId);
        console.log('draggedId', draggedId);
    } else if (event.target.parentElement.id && event.target.parentElement.id != draggedId) {
        droppedId = event.target.parentElement.id;
        updateKeys();
    }

});

function updateKeys() {
    var newKey = [];
    if (draggedId < droppedId) {
        var i;
        for (i = 0; i < draggedId; i++) {
            console.log('here');
            newKey.push(keys[i]);
        }
        i++;


        for (; i <= droppedId; i++) {
            console.log('ooo');
            newKey.push(keys[i]);
        }
        newKey.push(keys[draggedId]);
        for (; i < keys.length; i++) {
            console.log('trrrrrrr');
            newKey.push(keys[i]);
        }
        console.log(newKey);
        keys = newKey;
        console.log(keys);
        setList();
    }
}

function setList(thingsImWorkingOn) {
    var oldList = document.getElementsByTagName('ol');
    var divWorking = document.getElementsByClassName('working')[0];
    console.log(oldList);
    if (oldList && oldList.length > 0)
        divWorking.removeChild(oldList[0]);
    var orderedList = document.createElement('ol');
    divWorking.appendChild(orderedList);

    if (keys.length == 0)
        keys = thingsImWorkingOn;
    for (var i in keys) {
        var liClass;
        if (i % 2 == 0)
            liClass = 'even';
        else
            liClass = 'odd';
        var a = document.createElement('a');
        a.setAttribute('href', keys[i].path);

        a.setAttribute('target', 'blank');
        a.innerHTML = keys[i].name;

        var li = document.createElement('li');
        li.setAttribute('draggable', 'true');
        li.setAttribute('id', keys[i].id);
        li.setAttribute('class', liClass)

        li.appendChild(a);

        orderedList.appendChild(li)
    }
}

function setBooks(booksImReading) {
    var bookKeys = [];
    var oldList = document.getElementsByTagName('ol');
    var divBooks = document.getElementsByClassName('books')[0];
    if (oldList && oldList.length > 0)
        divBooks.removeChild(oldList[1]);
    var orderedList = document.createElement('ol');
    divBooks.appendChild(orderedList);

    if (bookKeys.length == 0)
        bookKeys = booksImReading;
    for (var i in bookKeys) {
        var liClass;
        if (i % 2 == 0)
            liClass = 'even';
        else
            liClass = 'odd';
        var a = document.createElement('a');
        a.setAttribute('href', bookKeys[i].path);

        a.setAttribute('target', 'blank');
        a.innerHTML = bookKeys[i].name;

        var li = document.createElement('li');
        li.setAttribute('draggable', 'true');
        li.setAttribute('id', bookKeys[i].id);
        li.setAttribute('class', liClass)
        li.appendChild(a);

        orderedList.appendChild(li)
    }
}

function saveList() {
    console.log('Button Clicked');
}

function fetchChores() {
    return fetch('http://localhost:8081/getChores',
        {
            method: 'GET',
            //mode:'no-cors',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8081'
            }
        })
        .then(function (response) {
            //console.log('response', response.body);
            return response.json()
        })
        .then(function (data = {'1': '2'}) {
            console.log('thingsImWorkingOn', data);
            renderParent();
            setList(data);
        })
        .finally(() => true);
// setTimeout(setList, 500);
}

function fetchBooks() {
    return fetch('http://localhost:8081/books',
        {
            method: 'GET',
            //mode:'no-cors',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8081'
            }
        })
        .then(function (response) {
            //console.log('response', response.body);
            return response.json()
        })
        .then(function (data = {'1': '2'}) {
            console.log('booksImReading', data);
            renderParent();
            setBooks(data);
        })
        .finally(() => true);
// setTimeout(setBooks, 500);

}
