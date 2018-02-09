
var signTemplate = `<div class="container formclass">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">	
							<div class="col-xs-6">
								<a href="#" class="active" id="login-form-link">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="#" id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" action="https://phpoll.com/login/process" method="post" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="loginpassword" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember"> Remember Me</label>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" action="https://phpoll.com/register/process" method="post" role="form" style="display: none;">
									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`


var chatboxTemplate = `
 <div class="container">
  <form>
    <div class="form-group">
      <label for="comment">chat here:</label>
      <textarea class="form-control" rows="5" id="comment"></textarea>
    </div>
    <button type="button" class="btn btn-primary">Send</button>
  </form>
</div>
`


var chatlistTemplate = `
<div id="chatList" class="container">
	<div class= "row">
  	<div class= col-md-4 lg-4 sm-4>
			<div class="list-group">
			  <a href="#" class="list-group-item disabled">First item</a>
			  <a href="#" class="list-group-item">Second item</a>
			  <a href="#" class="list-group-item">Third item</a>
	  	</div>
		</div>

		<div class= col-md-4 lg-4 sm-4>

		 ${chatboxTemplate}
		<div>

	</div>
</div>
 `



$(function() {

	$('body').append(signTemplate) .append(chatlistTemplate);
	$('#chatList').hide();

    $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

$('#register-form').on("submit", ( (e) => {
	console.log("Hi")
 e.preventDefault();
 const data = {}
 data.email = $('#email').val();
 data.password = $('#password').val();
 
 console.log(data)
$.ajax({
  type: "POST",
  url: 'http://localhost:3000/register',
  data: data
})
	.done(function(data){
		console.log('success', data);
	})

} ));
 

$('#login-form').on('submit', ( (e) => {
    e.preventDefault();
    // randomly select one user from the database at the beginning,
    // so that we have one user for ordering and checkout
      var data = {
      	email: $('#username').val(), 
        password: $('#loginpassword').val()
      }
      var jsonData = JSON.stringify(data)
      console.log("the json data"+ jsonData)
      $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        contentType: "application/json",
        data: jsonData
      })
      .done(function(data) {
        console.log('success', data);

        if(data.error) {
          $('.loginerror').show();
          $('.errmsg').text(data.error);
        }
        else {
        	$('.formclass').hide();
          $('#chatList').toggle('slow');
        }
      })
      .fail(function(xhr) {
        console.log('error', xhr);
      }); 

      }));      



});