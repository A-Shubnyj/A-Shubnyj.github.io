const gifDiv = document.querySelector(".gifDiv")
const screen = document.querySelector('.container')
const loader = document.createElement('div');
loader.classList.add("loader");
const titleText = document.querySelector('.headerText')
const newGifButton = document.querySelector(".newGifBtn")
const overlay = document.querySelector('.overlay')
let gifElement = document.createElement("img")
let gifPreview = document.createElement("img")

const colors = [
    '#6eb6f0',
    '#f56c83',
    '#d96ca2',
    '#e07af0',
    '#bb7cf7',
    '#a784f5',
    '#7f81eb',
    '#6ca0f5',
    '#6bc1e8',
    '#6dc2d1',
    '#72bab2',
    '#41b58f',
    '#5fc786',
    '#b0d479',
    '#e8c75f',
    '#f5bb5b',
    '#f5914c',
    '#f25a5a',
]


let fetchPics = () => {
    const apiBaseURL = "https://api.giphy.com/v1/gifs/random";
    const apiKey = 'i012JkVN9Yo5Ol79YdCFCA0zHzoZyK9u';
    const tag = "cats";
    const rating = "g";
    gifDiv.innerHTML = '';

    const apiURL = encodeURI(
        apiBaseURL +
        "?api_key=" +
        apiKey +
        "&tag=" +
        tag +
        "&rating=" +
        rating
    )
    gifDiv.appendChild(loader);
    fetch(apiURL)
        .then(
            (response) =>
                response.json()
        )
        .then((data) => {
            let gifURL = data.data.images.original.url
            let gifPreviewURL = data.data.images.preview_webp.url
            let title = data.data.title
            titleText.textContent = title
            gifElement.className = 'img'
            gifPreview.className = 'preview'
            gifPreview.setAttribute('src', `${gifPreviewURL}`)
            gifElement.setAttribute('src', `${gifURL}`)
            gifDiv.replaceChild(gifPreview, loader)
            gifElement.onload = () => {
                gifDiv.replaceChild(gifElement, gifPreview);

            }


        })
        .catch(err => console.log(err)
        )
}

fetchPics();


newGifButton.addEventListener('click', () => {
    fetchPics();
    const color = colors[Math.floor(Math.random() * colors.length)]
    document.body.style.setProperty('--background', color)
})

let fullScreen = () => {
    let FSgif = new Image();
    if (gifElement.hasAttribute('src') == true) {
        FSgif.setAttribute('src', gifElement.getAttribute('src'));
        overlay.style.display = 'flex'
        if (screen.width > '720px'){
        overlay.style.alignItems = "stretch"
        } else {
        overlay.style.alignItems = "center"  
        }
        overlay.style.justifyContent = "space-evenly"
        FSgif.style.maxWidth = '100%'
        overlay.appendChild(FSgif)
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none'
            overlay.removeChild(FSgif)
        })
    }
}
gifDiv.addEventListener('click', () => {
    fullScreen()
})

