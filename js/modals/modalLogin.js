const loginBtn = document.querySelector("#loginBtn");
const openCheckoutModal = document.querySelector(".checkOut");
const closeCheckoutModal = document.getElementById("closeBtn");
const modalRenderer = document.querySelector(".popper");
const logoutButton = document.querySelector("#logoutBtn");
const openWelcomeModal = document.querySelector("#reg");

function getCurrentURL() {
  return window.location.pathname;
}

let thisUrl = getCurrentURL();

//EVENT LISTENERS
loginBtn.addEventListener("click", () => {
  renderLoginModal();
});

openCheckoutModal.addEventListener("click", () => {
  renderCheckoutModal();
});

logoutButton.addEventListener("click", () => {
  renderLogoutModal();
});

if (thisUrl === "/pages/register.html") {
  openWelcomeModal.addEventListener("click", () => {
    renderWelcomeModal();
  });
}

//-----------------FUNCTIONS-------------------

function renderLoginModal() {
  modalRenderer.innerHTML = `
  <dialog class="modal" id="loginDialog">
    <div class="popup">
      <h3>Login</h3>
      <div class="popup-content">
        <form action="../pages/mypage.html" target="_self">
          <label for="email">E-mail</label>
          <input type="email" name="email" id="email" class="form__input" autocomplete="off" required>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="form__input" autocomplete="current-password" required>
          <span>Sign up <a href="../pages/register.html">HERE!</a></span>
          <div class="actions">
            <input type="reset" value="Cancel" class="cta_button" id="cancelBtn">
            <input type="submit" value="Login" class="cta_button">
          </div>
        </form>
      </div>
    </div>
  </dialog>
  `;

  const dialog = document.querySelector("#loginDialog");
  dialog.showModal();

  const cancelButton = document.querySelector("#cancelBtn");

  // Form cancel button closes the dialog box
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
}

function renderCheckoutModal() {
  modalRenderer.innerHTML = `
  <dialog class="modal" id="checkoutDialog">
    <div class="popup">
      <h3>Thank you for your purchase! </h3>
      <div class="popup-content" id="checkoutmodal">
        <p class="desc">What do you want to do next?</p>
        <a href="../pages/movies.html">
          <div class="cta_button" id="closeBtn">
            Browse Movies
          </div>
        </a>
        <a href="../pages/mypage.html">
          <div class="cta_button">Library</div>
        </a>
        <a href="../pages/player.html">
          <div class="cta_button">Play movie</div>
        </a>
      </div>
    </div>
  </dialog>;
  `;
  const checkoutModal = document.getElementById("checkoutDialog");
  checkoutModal.showModal();
}

function renderLogoutModal() {
  modalRenderer.innerHTML = `
  <dialog class="modal" id="logoutDialog">
    <div class="popup" id="logout">
      <h3>Logged out! </h3>
      <div class="popup-content">
        <a href="../index.html">
          <div class="cta_button">Browse</div>
        </a>
      </div>
    </div>
  </dialog>
  `;

  const stopButton = document.querySelector("#stopBtn");
  const logoutdialog = document.querySelector("#logoutDialog");
  logoutdialog.showModal();
}

function renderWelcomeModal() {
  modalRenderer.innerHTML = `
    <dialog class="modal" id="welcomeDialog">
    <div class="popup">
      <h3>Welcome!</h3>
      <div class="popup-content">
        <p class="desc">You are on your way to an unsurpassed streaming experience!</p>
        <a href="../pages/mypage.html">
          <div class="cta_button" id="mypageBtn">My Page</div>
        </a>
      </div>
    </div>
  </dialog>
  `;

  const welcomeModal = document.querySelector("#welcomeDialog");
  welcomeModal.showModal();

  const closeWelcomeModal = document.querySelector("#mypageBtn");
  closeWelcomeModal.addEventListener("click", () => {
    welcomeModal.close();
  });
}
