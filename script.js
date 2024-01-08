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

