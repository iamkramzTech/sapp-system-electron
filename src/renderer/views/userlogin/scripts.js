  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("floatingPassword").value;
    const message = document.getElementById("message");
    const result = await window.api.login(email, password);
  
    if (result.success) {
      localStorage.setItem('email', result.user.email);
      localStorage.setItem('role', result.user.role);
      
      if(result.user.role === 'admin')
      {
         window.location.href = "../admindashboard/index.html";
      }
      else
      {
          window.location.href = "../userdashboard/index.html";
      }
   
    
    } else {
      alert(result.message)
      //HACK: reload page to clear input field when invalid credentials. 
      //FIXME:  Use DOM clear for better UX
      window.location.reload();
      // message.innerText = result.message;
      
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
  