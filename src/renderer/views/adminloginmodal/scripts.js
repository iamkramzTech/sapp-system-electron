  document.getElementById("adminloginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("floatingPassword").value;
    const message = document.getElementById("message");
    const result = await window.api.adminLogin(email, password);
  
    if (result.success) {
      localStorage.setItem('email', result.email);
      localStorage.setItem('role', result.role);
      
      window.location.href = "../admindashboard/index.html";
    // window.location.href = "welcome.html";
    } else {
      message.innerText = result.message;
    }
  });

  document.getElementById('showPassword').addEventListener('change',function(){
    const passwordInput = document.getElementById("floatingPassword");
    if(this.checked){
      passwordInput.type = 'text';
    }
    else
    {
      passwordInput.type = 'password';
    }
  });
  