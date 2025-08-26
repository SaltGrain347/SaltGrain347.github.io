function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const Button = document.getElementById('MusicButton');
const Music = document.getElementById('Music');
let ClickSFX = new Audio('/MusicPlayer/blipSelect.wav');

function CheckMuted() {

    if (!Music || !Music.getAttribute("src")) {
        Button.classList.add('Disabled');
        return;
    }

    if (getCookie('Muted') == 'true')
    {
        Music.pause();
        Button.innerText = '⏵';
    }
    else {Music.play().catch(() => {});}
}

function MuteButton() {
    ClickSFX.currentTime = 0;
    ClickSFX.play();
    if (!Music) return;
    if (getCookie('Muted') == 'true')
    {
        Music.play().catch(() => {});
        eraseCookie('Muted')
    }
    else {
        Music.pause();
        setCookie('Muted','true')
    }

}

document.addEventListener("DOMContentLoaded", () => {
    CheckMuted();

    Music.addEventListener('play', () => {
        Button.innerText = '⏸';
    });

        Music.addEventListener('pause', () => {
        Button.innerText = '⏵';
    });
});