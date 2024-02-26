const newcommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('input[name="post-id"]').value;
    console.log(comment);
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/blogs/${blog_id}`);
        }
        else {
            // redirect to login page
            document.location.replace('/login');
        }
    }
    console.log('comment:', comment);
};

document.querySelector('.comment-form').addEventListener('submit', newcommentHandler);