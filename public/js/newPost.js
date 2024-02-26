const newposthandler = async (event) => {
    console.log('click');
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if (title && content) {
        const response = await fetch('/api/postRoutes', {
            method: 'POST',
            body: JSON.stringify({ Topic: title, description: content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert('Failed to create post');
        }
    }
};

document.querySelector('#create-post').addEventListener('submit', newposthandler);