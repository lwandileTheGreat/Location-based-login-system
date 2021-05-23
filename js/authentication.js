const auth = firebase.auth();

function signUp() {
  let email = document.getElementById("signUpEmail");
  let password = document.getElementById("signUpPassword");
  let confirmPassword = document.getElementById("signUpConfirmPassword");
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    email.value == "" ||
    password.value == "" ||
    confirmPassword.value == ""
  ) {
    alert("Please fill in the required fields");
    return false;
  } else if (!email.value.match(validRegex)) {
    alert("Enter Valid Email Address!");
    return false;
  } else if (password.value != confirmPassword.value) {
    alert("Passwords do not match");
    return false;
  } else {
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => alert(e.message));

    return true;
  }
}

function signIn() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.value == "" || password.value == "") {
    alert("Please fill in the required fields");
    return false;
  } else if (!email.value.match(validRegex)) {
    alert("Enter Valid Email Address!");
    return false;
  } else {
    const promise = auth.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => alert(e.message));
  }
}

window.setInterval(
  auth.onAuthStateChanged((user) => {
    if (user) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      if (!navigator.geolocation) {
        console.log("Geolocation API not supported by this browser.");
      } else {
        console.log("Checking location...");
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
      function success(position) {
        function arePointsNear(checkPoint, centerPoint, km) {
          var ky = 40000 / 360;
          var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
          var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
          var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
          return Math.sqrt(dx * dx + dy * dy) <= km;
        }

        var yourLocation = {
          lat: position.coords.latitude,
          lng: position.coords.latitude,
        };
        var tableMountain = { lat: -33.957313888889, lng: 18.403108333333 };

        var yesOrNo = arePointsNear(yourLocation, tableMountain, 5);

        if (yesOrNo) {
          //Take user to a different or home page
          location.href = "main.html";
        } else {
          alert(
            "You are out of range, cannot login. Get to the supported location/s and try again."
          );
        }
      }

      //is signed in
    } else {
      alert("No Active User, Enter Your Email & Password!!");
    }
  }),
  2000
);
