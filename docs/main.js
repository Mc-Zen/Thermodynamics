const reposUrl = "https://mc-zen.github.io/Thermodynamics/"

function toggle_viewer() {
    let vw = document.getElementById("viewer-wrapper");
    let cw = document.getElementById("content-wrapper");
    if (vw.style.display != "flex") {
        vw.style.display = "flex";
        cw.style.display = "none";
    } else {
        vw.style.display = "none";
        cw.style.display = "block";
    }
}



// get file modification date: https://gist.github.com/xdevmaycry/b0ef73f66d9847a980edbfab4c135a77

function ready(callback) {

    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') callback();
    });
}

ready(function () {
    initPage();
});

function fetchHeader(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var lastModified = xhr.getResponseHeader('Last-Modified');
                formatAndUpdateDate(lastModified);
                return;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function formatAndUpdateDate(dateString) {
    var parsedTime = new Date(dateString).getTime();
    var a = new Date(parsedTime);
    // If you prefer non-numeric month:
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // var month = months[a.getMonth()];
    var year = a.getFullYear();
    var month = a.getMonth() < 9 ? '0' + Number(a.getMonth() + 1) : Number(a.getMonth() + 1);
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

    var formattedDate = date + '.' + month + '.' + year + ' um ' + hour + ':' + min;

    var el = document.getElementById("last-updated-date");

    if (el !== undefined) {
        el.textContent = formattedDate;
    }
}

function initPage() {
    updateVersion();
    updateFileDate();
}

function updateFileDate() {
    const url = reposUrl + "pdf/Theo_IV.pdf";

    if (url !== undefined) {
        fetchHeader(url);
    }
}

function updateVersion() {

    // read text from URL location
    const url = reposUrl + "version.txt";

    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let version = request.responseText;
                setDownloadLinkVersion(version);
                setVersionLabel(version);
            }
        }
    }
}


function setDownloadLinkVersion(version) {
    let downloadlinks = document.getElementsByClassName("pdf-download-button");
    for (let i = 0; i < downloadlinks.length; i++) {
        downloadlinks[i].download = "Theo_IV_v" + version + ".pdf";
    }
}

function setVersionLabel(version) {
    let el = document.getElementById("current-version");
    el.textContent = version;
}