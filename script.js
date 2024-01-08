document.addEventListener('DOMContentLoaded', function() {
    loadLinks();
});

function createButton() {
    var linkInput = document.getElementById('linkInput');
    var buttonNameInput = document.getElementById('buttonNameInput');

    var link = linkInput.value;
    var buttonName = buttonNameInput.value;

    if (link !== '') {
        saveLink(link, buttonName);
        renderLinks();

        // Clear input fields after processing
        linkInput.value = '';
        buttonNameInput.value = '';
    } else {
        alert('Please enter a valid link');
    }
}


function saveLink(link, buttonName) {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ link, buttonName });
    localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
    renderLinks();
}

function renderLinks() {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    var buttonContainer = document.getElementById('buttonContainer');

    // Clear existing content in the container
    buttonContainer.innerHTML = '';

    links.forEach(function(linkObj) {
        var linkItem = document.createElement('div');
        linkItem.classList.add('link-item');

        var newButton = document.createElement('button');
        newButton.textContent = linkObj.buttonName || linkObj.link; // Use button name if provided, otherwise use the link
        newButton.classList.add('button');

        newButton.addEventListener('click', function() {
            window.open(linkObj.link, '_blank'); // Open link in a new tab
        });

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', function() {
            removeLink(linkObj.link);
            renderLinks();
        });

        linkItem.appendChild(newButton);
        linkItem.appendChild(removeButton);
        buttonContainer.appendChild(linkItem);
    });
}

function removeLink(linkToRemove) {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    var updatedLinks = links.filter(function(linkObj) {
        return linkObj.link !== linkToRemove;
    });
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

document.addEventListener('DOMContentLoaded', function () {
    loadLinks();
    initSortable();
});

function initSortable() {
    var buttonContainer = document.getElementById('buttonContainer');
    new Sortable(buttonContainer, {
        animation: 150,
        onEnd: function (evt) {
            // Update the order of links in localStorage based on the new order
            updateLinksOrder();
        }
    });
}

function updateLinksOrder() {
    var links = Array.from(document.querySelectorAll('.link-item button')).map(function (button) {
        return button.dataset.link;
    });

    var updatedLinks = JSON.parse(localStorage.getItem('links')) || [];

    updatedLinks.sort(function (a, b) {
        return links.indexOf(a.link) - links.indexOf(b.link);
    });

    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

function renderLinks() {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    var buttonContainer = document.getElementById('buttonContainer');

    // Clear existing content in the container
    buttonContainer.innerHTML = '';

    links.forEach(function (linkObj) {
        var linkItem = document.createElement('div');
        linkItem.classList.add('link-item');

        var newButton = document.createElement('button');
        newButton.textContent = linkObj.buttonName || linkObj.link;
        newButton.classList.add('button');
        newButton.dataset.link = linkObj.link; // Store the link in a data attribute

        newButton.addEventListener('click', function () {
            window.open(linkObj.link, '_blank');
        });

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', function () {
            removeLink(linkObj.link);
            renderLinks();
        });

        linkItem.appendChild(newButton);
        linkItem.appendChild(removeButton);
        buttonContainer.appendChild(linkItem);
    });
}
