export function registration() {
    return `
    <div class="registration text-center" id="registration">
    <form class="form-registration" id="registrationForm">
        <!-- <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
        <h1 class="h3 mb-3 font-weight-normal">Register now!</h1>
        <input type="email" name="registration_email" class="form-control"  placeholder="Email address"
               id="registrationEmail"
               required autofocus>
                <label for="registrationEmail" class="sr-only no-line" id ="editListError">Email address</label>

        <input type="password" name="registration_password" class="middle-password form-control" placeholder="Password"
               id="registrationPassword"
               required>
                <label for="registrationPassword" class="sr-only">Password</label>

        <input type="password" name="registration_password_confirm" class="form-control" placeholder="Confirm password"
               id="confirmRegistrationPassword"
               required>
                <label for="confirmRegistrationPassword" class="sr-only">Password</label>

        <!--  <div class="checkbox mb-3" id="errorField">
             <label>
                 <input type="checkbox" value="remember-me"> Remember me
             </label>
         </div>-->
        <button id="registrationBtn" class="btn btn-lg btn-block btn-registration" name="registration_password_submit"
                type="submit">Register
        </button>
        <div class="register-now text-center" id="signInLink"><p>Sign in</p></div>
    </form>
</div>
    `
}