//获取dom
const playmode_list = document.querySelectorAll('.end .head .left .mode')
const playmode_list_father = document.querySelector('.end .head .left')
const jindutiao_di = document.querySelector('.end .jindu .jindutiao_di')
const jindutiao = document.querySelector('.end .jindu .jindutiao')
const jindutiao_point = document.querySelector('.end .jindu .jindutiao_dian')
const play_listnow = document.querySelector('.body .body_left .main')
const play_dom_sfbf = document.querySelectorAll('.end .head .play .play_center')
const kuaitui = document.querySelector('.end .head .play .play_left')
const kuaijin = document.querySelector('.end .head .play .play_right')
const xiazai = document.querySelector('.end .head .right .xiazai')

const playaudio = new Audio()
const playlist = []
function playlist_obj() {
    this.name = ''
    this.id = ''
    this.artist = ''
    this.lyric = ''
    this.url = ''
    this.photo = ''
}
// const playlist_obj = {
//     name: '',
//     id: '',
//     artist: '',
//     lyric: '',
//     url: '',
//     photo: ''
// }
//search
const searchtext = document.querySelector('.header .right .search')
const searchbutton = document.querySelector('.header .right button')
const reasontext = document.querySelector('.body .body_right .search_reason ul')
const setpage = document.querySelector('.body .body_right .page')
let pagenow = 1
let palysongnow = -1
let sfbf = 0
const gechidianji = document.querySelector('.end .head .right .gechi')
const gechi = document.querySelector('.body .gechi')
const body_left = document.querySelector('.body .body_left')
const body_right = document.querySelector('.body .body_right')

let gechiul = document.querySelector('.body .gechi .gechiwenzi')
let lilist = document.querySelectorAll('.body .gechi .gechiwenzi li')
const body = document.querySelector('.body')
let shangcigundong = -1

let lines = 0;
let lyric = '';
let paused = false;
let globalObject = {};
let progess = 0;
let setted = false;
let statuss = false;