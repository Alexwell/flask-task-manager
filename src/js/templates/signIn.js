export function signIn() {
    return `<div class="signin text-center" id="signInContainer">
    <form class="form-registration" id="loginForm">
        <!-- <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
        <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
        <input type="email" name="email" class="form-control" placeholder="Email address" id="loginEmail" required
               autofocus>
        <label for="loginEmail" class="sr-only no-line" id="loginEmailError">Email address</label>

        <input type="password" name="password" class="form-control" placeholder="Password" id="loginPassword" required>
        <label for="loginPassword" class="sr-only no-line" id="editListError">Password</label>

        <!--  <div class="checkbox mb-3" id="errorField">
             <label>
                 <input type="checkbox" value="remember-me"> Remember me
             </label>
         </div>-->
        <button id="signIn" class="btn btn-lg btn-block btn-registration" type="submit">Sign in</button>
        <div class="register-now text-center" id="registerNow"><p>Register now!</p></div>
    </form>

</div>`
}