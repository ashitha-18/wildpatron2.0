import React from 'react';

const WaitlistSignup = () => {
  const handleSignup = () => {
    // URL of your Google Form
    const googleFormUrl = 'https://docs.google.com/forms/your-form-url';

    // Open the Google Form in a new tab
    window.open(googleFormUrl, '_blank');
  };

  return (
    <div>
      <h2>Sign Up for Waitlist</h2>
      <button onClick={handleSignup}>Open Signup Form</button>
    </div>
  );
};

export default WaitlistSignup;


