const firebaseConfig = {
    apiKey: "AIzaSyD4Gkb4e2FjXYun62is3E36BxIUhvDOssQ",
    authDomain: "form-1b270.firebaseapp.com",
    databaseURL: "https://form-1b270-default-rtdb.firebaseio.com",
    projectId: "form-1b270",
    storageBucket: "form-1b270.appspot.com",
    messagingSenderId: "1011706338856",
    appId: "1:1011706338856:web:4e47b6998c1e66b2e71f1d",
    measurementId: "G-EEMTJT6VGM"
};
firebase.initializeApp({
    apiKey: "AIzaSyD4Gkb4e2FjXYun62is3E36BxIUhvDOssQ",
    authDomain: "form-1b270.firebaseapp.com",
    projectId: "form-1b270"
});

var db = firebase.firestore();
const signinemail = document.getElementById("signinemail");
const signinpassword = document.getElementById("signinpassword");
const signin = document.getElementById("signin");
const signupemail = document.getElementById("signupemail");
const signuppassword = document.getElementById("signuppassword");
const signup = document.getElementById("signup");
const submit = document.getElementById("submit");
const logout = document.getElementById("logout");

if (signup) {
    signup.addEventListener('click', e => {
        firebase.auth().createUserWithEmailAndPassword(signupemail.value, signuppassword.value).then(user => {
          
            window.location.href = "dob.html";
        }).catch(error => {
            alert(error);
            window.location.href = "index.html";
        })
    });
}

if (signin) {
    signin.addEventListener('click', e => {
        firebase.auth().signInWithEmailAndPassword(signinemail.value, signinpassword.value).then(user => {
          
            const userRef = db.collection('users').doc(user.user.uid);
            userRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        window.location.href = "dob.html";
                    } else {
                        window.location.href = "loggedin.html";
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        }).catch(error => {
            alert(error);
        })
    });
}
if (logout)
    logout.addEventListener('click', signout);
function signout() {
    firebase.auth().signOut().then(() => {
      
        window.location.href = "index.html";
    }).catch((error) => {
         });
}

if (submit)
    submit.addEventListener('click', setdob);

function setdob() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);

            db.collection("users").doc(user.uid).set({
                dob: document.getElementById("dob").value
            })
                .then(() => {
                    window.location.href = "loggedin.html";
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });


        } else {
            window.location.href = "index.html";
        }
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const userRef = db.collection('users').doc(user.uid);
        userRef.get()
            .then(doc => {
                if (!doc.exists) {
                    document.getElementById("displaydob").innerHTML = "ERROR";
                } else {
                    document.getElementById("displaydob").innerHTML = doc.data().dob;
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }
    else console.log("No user found");
})

