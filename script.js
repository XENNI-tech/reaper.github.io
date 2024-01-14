function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var imageContainer = document.getElementById('imageContainer');
    var shareableLink = document.getElementById('shareableLink');
    var username = document.getElementById('username').value;

    if (username.trim() === "") {
        alert("Please enter a username.");
        return;
    }

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('image', file);
        formData.append('username', username);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            var imgElement = document.createElement('img');
            imgElement.src = '/images/' + data.imageUrl;

            imageContainer.innerHTML = ''; // Clear previous images
            imageContainer.appendChild(imgElement);

            // Create and display the sharable link
            var link = window.location.href.split('?')[0] + "?username=" + encodeURIComponent(data.username) + "&image=" + encodeURIComponent(data.imageUrl);
            shareableLink.innerHTML = '<p>Shareable Link: <a href="' + link + '" target="_blank">' + link + '</a></p>';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
