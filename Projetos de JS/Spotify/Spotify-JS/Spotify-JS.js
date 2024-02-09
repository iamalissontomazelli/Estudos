let musics = [
    {titulo:'Phonx', artista:'Alisson Tomazelli', src:'Spotify-Music/Akiaura - sleepwalker (PHONK remix).mp3', img:'Spotify-Img/Capa.jpeg'},
    {titulo:'Hardstyle', artista:'Zyzz', src:'Spotify-Music/Zyzz - Broken Heart.mp3', img:'Spotify-Img/Capa.jpeg'},
    {titulo:'Hardstyle', artista:'Zyzz', src:'Spotify-Music/Zyzz - Heavens Door.mp3', img:'Spotify-Img/Capa.jpeg'}
];

let music = document.querySelector('audio');
let indexMusic = 0;

let durationMusic = document.querySelector('.fim');
let photoCase = document.querySelector('img');
let nameMusic = document.querySelector('.descricao h2');
let artistName = document.querySelector('descricao i');

DurationMusic.textContent = secForMinutes(Math.floor(music.duration));


// Events 

document.querySelector('.botao-play').addEventListener('click', PlayMusic);

document.querySelector('.botao-pause').addEventListener('click', PauseMusic);

music.addEventListener('timeupdate', barUpdate);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusic--;
    rederizarMusica(indexMusic);
});

document.querySelector('.proximo').addEventListener('click', () => {
    indexMusic++;
    rederizarMusica(indexMusic);
});

// Functions

function rederizarMusica(index){
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        nameMusic.textContent = musics[index].titulo;
        artistName.textContent = musics[index].artista;
        photoCase.src = musics[index].img;
        DurationMusic.textContent = secForMinutes(Math.floor(music.duration));
    });
}

function PlayMusic(){
    music.play();
}

function PauseMusic(){
    music.pause();
}

function barUpdate(){
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let MusicTimer = document.querySelector('.inicio');
        MusicTimer.textContent = secForMinutes(Math.floor(music.currentTime));
}
function secForMinutes(segunds){
    let MinutesField = Math.floor(segunds / 60);
    let SegundsField = segunds % 60;
        if (SegundsField < 10){
            SegundsField = '0' + SegundsField;
        }
    return MinutesField + ':' + SegundsField;
}
