const loginHandler = async (event) => {
  event.preventDefault();


const loginFormHandler = async (event) => {
    event.preventDefault();
  console.log('im here');
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

  //'checking if email and password are not empty' and if they exist, a POST request is made to /api/users/login with the email and password in the body. 
  //If the response is ok, the user is redirected to the homepage. If the response is not ok, an alert is shown.
  console.log(email, password);


  if (email && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {

        console.log('ok');
        document.location.replace('/');


      } else {
          alert('Failed to log in');
      }
<<<<<<< HEAD
    }
  };
  
=======
  }
};


>>>>>>> 87b0931aa1fc510a12f1ed337e8c01e1cb8b3b93
  
  document
    .querySelector('form')
    .addEventListener('submit', loginFormHandler);

  
