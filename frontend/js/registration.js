const submit = document.getElementById("submit");
const email = document.getElementById("e-mail");
const password = document.getElementById("password");
const name = document.getElementById("name");
const file = document.getElementById("file").files[0];
const surname = document.getElementById("last name");
const loading_line = document.getElementById("loading-status");
const img = new Image();
img.src = '/background.jpg';
console.log(img);

submit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(file);

    if (!ValidateEmail(email.value)) {
        loading_line.classList.add("load"); 
        return;
    }

    const xhr = new XMLHttpRequest();
    const body = JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        surname: surname.value,
        img: img,
        file: file
    });
    

    xhr.upload.onprogress = (event) => {
        // console.log("onprogress");
        console.log(`-${100 - (100 / (event.total / event.loaded))}%`);
        loading_line.style.left = `-${100 - (100 / (event.total / event.loaded))}%`;
        // alert("Loaded: " + event.loaded + " Out of: " + event.total)
    };
   
    xhr.upload.onload = () => {
        setTimeout(function async () {
            if (xhr.ststus != 204) {
                loading_line.classList.add("load"); 
            }
       
        }, 150);
        switch (xhr.status) {
            case 302:
                console.log("yes");
                // window.location.href = '/login';
                break;
            case 204:
                email_class("error");
                console.log("This email is already taken");
                break;
            case 200:
                console.log("Request successufuly have sent");
                break;           
            default:
                console.log("Error:" + xhr.statusText);
                break;
        };
    };
    

    xhr.upload.onerror = () => {
        setTimeout(() => {
            loading_line.classList.add("load");
        }, 150);
        alert("Something going wrong...");
    };

    xhr.open( "post" ,"/authentication/registration");

    xhr.setRequestHeader('Content-type','application/json');

    xhr.send(body);
});

// login("nazabakhtiyorov@gmail.com");

function login(email) {
    const xhr = new XMLHttpRequest();
    xhr.open( "post" ,"/login/user");
    xhr.setRequestHeader('Content-type','application/json');

    xhr.onload = () => {
        
        if (xhr.status = 200) {
            if (xhr.response) {
                const res = JSON.parse(xhr.response);
                console.log(res);   
            } else {
                console.log("Error:" + xhr.statusText);
            }
            
        } else {
            console.log("Error:" + xhr.statusText);
        }
    };

    xhr.send( JSON.stringify( {email: email} ));
}

function email_class(status) {
    if (status == "error") {
        email.classList.add('err_input');
    } else {
        email.classList.remove('err_input');
    }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false);
}