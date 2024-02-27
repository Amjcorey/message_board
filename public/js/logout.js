const logout = async () => {
  console.log('click');
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('button').addEventListener('click', logout);
  