
const signupFormHandler = async (event) => {
    event.preventDefault();

  //if user is new to enter his username, email and password to sign up

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const initials = document.querySelector('#initial-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    console.log(name, initials, email, password);

    if (name && initials && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, initials, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('ok');
        document.location.replace('/');
        
      } else {
        alert('Failed to sign up.');
      }
    }
  };


  
  document
    .querySelector('form')
    .addEventListener('submit', signupFormHandler);
  