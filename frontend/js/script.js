console.log("Hello World!");
    const bg_height1 = document.querySelector(".background_img");
    const text1 = document.querySelector(".background_text");
    text1.style.height = `${bg_height1.scrollHeight}px`;

    window.addEventListener("resize", function() {
        const bg_height = document.querySelector(".background_img");
        text1.style.height = `${bg_height.clientHeight}px`;
        console.log(bg_height1);
    });

document.addEventListener("DOMContentLoaded", function() {
    const bg_height = document.querySelector(".background_img");
    const text = document.querySelector(".background_text");
    text.style.height = `${bg_height.clientHeight}px`;

    window.addEventListener("resize", function() {
        text.style.height = `${bg_height.clientHeight}px`;
        console.log(bg_height);
    });
    
});
 
request_user();
function request_user() {
    let xhr = new XMLHttpRequest();
    let data = {
        "email": "asahero@gmail.com",
        "password": "Tashkent2002"
    };
    xhr.open("POST", "/registration");
    xhr.send(JSON.stringify(data));
    

    xhr.onload = () => {
        if (xhr.status != 200) { 
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else { 
            const res = JSON.parse(xhr.responseText);
            if (res == "error") {
                console.log(res);
            }else{
                console.log(res);
            }
           
        }
    }

    xhr.onerror = () => {
        console.log("Error: " + xhr.statusText);
    }

}

