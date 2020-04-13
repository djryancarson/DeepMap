<?php
   session_start();
   
   
   $myusername = '';
   $mypassword = '';
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      
      $myusername = $_POST['username'];
      $mypassword = $_POST['password'];          
		
      if($myusername == "apple" && $mypassword == "apple"){
      	$_SESSION['login_user'] = $myusername;
         header('location: home.php');
         exit();
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>

<html>
<body>
<h1>Login Page</h1>

<form action="" method = "post">
	<p>Username</p>
	<input type="text" name="username"></input>

	<p>Password</p>
	<input type="password" name="password"></input>

	<input type="submit" value="Submit"></input>
</form>
</body>
</html>