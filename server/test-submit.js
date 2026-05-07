import fetch from 'node-fetch';

async function test() {
  try {
    const random = Math.floor(Math.random() * 100000);
    const registerBody = {
      firstName: "Test",
      lastName: "User",
      email: `test${random}@example.com`,
      password: "password123",
      phoneNumber: `99999${random}`.slice(0,10)
    };
    
    // using 127.0.0.1 was failing if it listens on IPv6 only, so we use localhost 
    // or we can just specify IPv4/IPv6 depending on OS. Let's use 127.0.0.1 if it was ipv4, wait it's IPv6 so use [::1]
    const baseUrl = 'http://[::1]:8000';
    
    console.log("Registering user...");
    const resReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerBody)
    });
    
    const regData = await resReg.json();
    console.log("Register response:", regData);

    console.log("Logging in...");
    const resLogin = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: registerBody.email, password: registerBody.password })
    });
    const loginData = await resLogin.json();
    console.log("Login response:", loginData);
    
    const token = loginData.token || (resLogin.headers.raw()['set-cookie'] || []).join(';');
    console.log("Token:", token.substring(0, 20) + "...");

    console.log("Submitting complaint...");
    // Without files, the complaint.controller might throw an error or it might work
    // because multer doesn't fail if files are missing unless we enforce it.
    
    // Instead of node-fetch form-data which might be tricky, let's just use JSON if we can? 
    // Wait, multer `.array('files')` expects multipart. If we don't send multipart, req.body is empty.
    const resSubmit = await fetch(`${baseUrl}/api/complaints/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rawText: 'This is a test complaint without files' })
    });
    
    const submitData = await resSubmit.json();
    console.log("Submit response:", submitData);

  } catch(e) {
    console.error(e);
  }
}
test();
