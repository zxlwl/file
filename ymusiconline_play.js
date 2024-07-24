(function () {
    let playmodetype = 1
    let bool_sfanxia = 0

    //进度条
    jindutiao_point.addEventListener('mousedown', function () {
        bool_sfanxia = 1;
    })
    document.addEventListener('mouseup', function (e) {
        bool_sfanxia = 0;
        // console.log(e);

    })
    // playmode_list_father.addEventListener('click', change_playmode(playmodetype, playmode_list))
    playmode_list_father.addEventListener('click', function () {
        playmodetype = change_playmode(playmodetype, playmode_list)

    })
    jindutiao_di.addEventListener('mousemove', function (e) {
        // console.log(e);
        if (bool_sfanxia) {
            jindutiao.style.width = ((e.clientX - 7) + 'px');
            jindutiao_point.style.left = ((e.clientX - 7) + 'px');
            if (playaudio.paused) {

            }
            else {
                // console.log((e.clientX - 7) / jindutiao_di.clientWidth * playaudio.duration);
                //跳转秒数 
                playaudio.currentTime = (e.clientX - 7) / jindutiao_di.clientWidth * playaudio.duration
                change(playaudio.currentTime)
            }
        }
    })
    jindutiao_di.addEventListener('click', function (e) {
        // console.log(e);
        jindutiao.style.width = ((e.clientX - 7) + 'px');
        jindutiao_point.style.left = ((e.clientX - 7) + 'px');
        if (playaudio.paused) {

        }
        else {
            // console.log((e.clientX - 7) / jindutiao_di.clientWidth * playaudio.duration);
            //跳转秒数 
            playaudio.currentTime = (e.clientX - 7) / jindutiao_di.clientWidth * playaudio.duration
            change(playaudio.currentTime)
        }
    })
    //调整进度条
    playaudio.addEventListener('timeupdate', function () {
        // console.log(jindutiao_di.clientWidth);
        jindutiao_tiaozhenweizi(playaudio.currentTime / playaudio.duration * jindutiao_di.clientWidth)
    });
    //能播放就播放并调整按钮
    playaudio.addEventListener('canplay', function () {
        playaudio.play()
        //在这放歌词渲染的函数

        start(0)
        sfbf = 1
        play_dom_sfbf[1].style.display = 'none'
        play_dom_sfbf[0].style.display = 'block'
    })
    //点击歌单播放
    play_listnow.addEventListener('click', function (e) {
        if (e.target.dataset.playid) {
            // console.log(11111111);
            play_chick(e.target, e.target.dataset.playid)
        }
        else if (e.target.parentNode.dataset.playid) {
            play_chick(e.target.parentNode, e.target.parentNode.dataset.playid)
        }
        else if (e.target.parentNode.parentNode.dataset.playid) {
            play_chick(e.target.parentNode.parentNode, e.target.parentNode.parentNode.dataset.playid)
        }
    })

    //播放及暂停
    play_dom_sfbf[0].parentNode.addEventListener('click', function (e) {
        // console.log(e.target.dataset.playsf);
        if (e.target.dataset.playsf === '0') {
            // console.log(2000);
            play_dom_sfbf[1].style.display = 'none'
            play_dom_sfbf[0].style.display = 'block'
            playaudio.play()
            // start(0)
            start(playaudio.currentTime)
            sfbf = 1

        }
        else if (e.target.dataset.playsf === '1') {
            play_dom_sfbf[0].style.display = 'none'
            play_dom_sfbf[1].style.display = 'block'
            playaudio.pause()
            pause()
            sfbf = 0
        }
    })
    //快进和快退
    kuaijin.addEventListener('click', function () {
        if (sfbf) {
            playaudio.currentTime = playaudio.currentTime + 5
            change(playaudio.currentTime)
        }

    })
    kuaitui.addEventListener('click', function () {
        if (sfbf) {
            playaudio.currentTime = playaudio.currentTime - 5
            change(playaudio.currentTime)
        }

    })


    //播放完
    playaudio.addEventListener('ended', function (e) {
        // console.log(7777777);
        for (let i = 0; i < playmode_list.length; i++) {
            // console.log(playmode_list[i].style.display);
            if (window.getComputedStyle(playmode_list[i]).display == 'block') {
                // console.log('进去');
                if (playmode_list[i].dataset.playmodeid === '1') {
                    // console.log('执行');
                    var randomNumber = Math.floor(Math.random() * playlist.length);
                    // console.log(randomNumber);
                    play_chick(play_listnow.children[randomNumber + 3], randomNumber)


                }
                else if (playmode_list[i].dataset.playmodeid === '2') {
                    // console.log(palysongnow + 1);
                    if (palysongnow + 1 == playlist.length) {
                        // console.log(play_listnow.children[3]);
                        palysongnow = 0
                        play_chick(play_listnow.children[3], palysongnow)
                    }
                    else {
                        // console.log(play_listnow.children[palysongnow + 3]);
                        palysongnow++
                        play_chick(play_listnow.children[palysongnow + 3], palysongnow)
                    }
                }
                else {
                    playaudio.play()
                }
            }
        }
    })
    //下载
    xiazai.addEventListener('click', function () {
        const a = document.createElement('a')
        a.href = playlist[palysongnow].url
        // console.log(playlist[palysongnow].name);
        // a.setAttribute('target', '_blank')
        a.download = playlist[palysongnow].name + '.mp3'
        a.click();
    })

    gechidianji.addEventListener('click', e => {
        // console.log(123);
        // console.log(gechi.dataset.id);
        if (Boolean(Number(gechi.dataset.id))) {

            // console.log(1);
            body_left.style.width = '100%'
            body_right.style.width = '100%'
            setpage.style.display = 'flex'
            // setpage.children[0].children[0].style.display = 'none'
            // setpage.children[1].children[0].style.display = 'none'
            // setpage.children[1].children[1].style.display = 'none'
            gechi.style.height = '0%'
            gechi.style.width = '0%'
            gechi.dataset.id = 0
            gechi.children[0].children[0].style.display = 'none'

        }
        else {
            // console.log(0);
            body_left.style.width = '0px'
            body_right.style.width = '0px'
            setpage.style.display = 'none'
            // setpage.children[0].children[0].style.width = '0%'
            // setpage.children[1].children[0].style.width = '0%'
            // setpage.children[1].children[1].style.width = '0%'
            gechi.style.height = '100%'
            gechi.style.width = '100%'
            gechi.dataset.id = 1
            gechi.children[0].children[0].style.display = 'block'


        }
    })
})()

function jindutiao_tiaozhenweizi(key) {
    // console.log(1111);
    jindutiao.style.width = (key + 'px');
    jindutiao_point.style.left = (key + 'px');
}

function change_playmode(playmodetype, playmode_list) {
    // console.log(playmodetype);
    for (let i = 0; i < playmode_list.length; i++) {
        if (+playmode_list[i].dataset.playmodeid == playmodetype) {
            playmode_list[i].style.display = 'none'
            // console.log(playmode_list.length);
            // console.log(i);
            if (i == playmode_list.length - 1) {
                playmode_list[0].style.display = 'block'

                return +playmode_list[0].dataset.playmodeid
            }
            else {
                playmode_list[i + 1].style.display = 'block'
                // console.log(playmodetype);
                return +playmode_list[i + 1].dataset.playmodeid

            }
        }
    }
}


function play_listnew(raw) {
    for (let i = 0; i < playlist.length; i++) {
        // console.log(playlist[i].id);
        // console.log(raw['song_data']['id'])
        if (playlist[i].id === raw['song_data']['id']) {
            // console.log(123);
            play_chick(play_listnow.children[i + 3], i)
            return 1
        }
    }
    play_addsong(raw)
}

function play_chick(li, i) {
    //li.children[0].children[0].innerText = raw['song_data']['name']
    //li.children[0].children[1].innerText = raw['song_data']['artist']
    //li.children[1].style.backgroundImage = `url(${raw['song_data']['pic']})`
    for (let i = 0; i < playlist.length; i++) {
        if (play_listnow.children[i + 3].children[2].className == 'loading') {
            play_listnow.children[i + 3].children[2].className = 'play'
        }
    }
    li.children[2].className = 'loading'
    li.children[2].innerHTML = '<div class="load"></div><div class="load"></div><div class="load"></div><div class="load"></div>'
    palysongnow = i
    playaudio.src = playlist[i].url
    gechi.children[0].children[0].src = playlist[i].photo
    set(playlist[i].lyric)
    palysongnow = i
    // playaudio.play()
}
function play_addsong(raw) {
    // console.log(raw);
    const newsong = play_listnow.children[1].cloneNode(true)
    newsong.children[0].children[0].innerText = raw['song_data']['name']
    newsong.children[0].children[1].innerText = raw['song_data']['artist']
    newsong.children[1].style.backgroundImage = `url(${raw['song_data']['pic']})`
    for (let i = 0; i < playlist.length; i++) {
        if (play_listnow.children[i + 3].children[2].className == 'loading') {
            play_listnow.children[i + 3].children[2].className = 'play'
        }
    }
    newsong.children[2].className = 'loading'
    newsong.children[2].innerHTML = '<div class="load"></div><div class="load"></div><div class="load"></div><div class="load"></div>'
    newsong.dataset.playid = playlist.length
    newsong.style.display = 'flex'
    const newsongli = new playlist_obj()
    newsongli.name = raw['song_data']['name']
    newsongli.artist = raw['song_data']['artist']
    newsongli.id = raw['song_data']['id']
    newsongli.lyric = raw['song_data']['lyric']
    newsongli.url = raw['song_data']['url']
    newsongli.photo = raw['song_data']['pic']
    playlist.push(newsongli)
    // console.log(playlist);
    play_listnow.appendChild(newsong)
    gechi.children[0].children[0].src = raw['song_data']['pic']
    playaudio.src = raw['song_data']['url']
    set(raw['song_data']['lyric'])
    palysongnow = playlist.length - 1
    // playaudio.play()
}


function gundong(id) {
    // console.log(lilist[id].offsetTop - (gechiul.offsetHeight / 2));
    gechiul.scrollTop = lilist[id].offsetTop - (gechiul.offsetHeight / 2)
    if (shangcigundong == -1) { }
    else {
        lilist[shangcigundong].style.fontSize = '18px'
    }
    // console.log(lilist[id]);
    lilist[id].style.fontSize = '22px'
    shangcigundong = id;

}


//渲染
function xuanran(benjugechi, line) {
    const li = lilist[0].cloneNode()
    // console.log(li);
    li.style.display = 'block'
    li.innerText = benjugechi
    gechiul.appendChild(li)
}

//推送
function tuishong(benjugechi, line) {
    gundong(line)
}


function set(lyrics) {
    if (statuss == true) {
        this.emit('onError', '请先暂停推送再设置！')
        this.widgetWarn('请先暂停推送再设置！')
    }
    lyric = lyrics
    setted = true;
    const line = polyfillForCoco();
    lines = line.length
    line.forEach((line, i) => {
        const match = line.match(/\[(\d+:\d+\.\d+)\](.*)/);
        if (match) {
            const [, , content] = match;
            // this.emit('onParse', content.trim(), i);
            xuanran(content.trim(), i)
        }
    })
    // this.emit('onAccomplish')
    finishgechi()
}

function start() {
    if (setted == false) {
        // this.emit('onError', '请先设置歌词！')
        // widgetWarn('请先设置歌词！');
        return;
    }
    if (statuss == true) {
        // this.emit('onError', '请先暂停推送再开始！')
        // this.widgetWarn('请先暂停推送再开始！')
    }
    clearObject();
    statuss = true;
    paused = false;
    this.play();
}


function change(seconds) {
    if (setted == false) {
        this.emit('onError', '请先设置歌词！')
        this.widgetWarn('请先设置歌词！');
        return;
    }
    if (statuss == false) {
        this.emit('onError', '请先开始推送！')
        this.widgetWarn('请先开始推送');
        return;
    }
    statuss = false;
    paused = true;
    clearObject();
    start(seconds);
}

function pause() {
    if (setted == false) {
        this.emit('onError', '请先设置歌词！')
        this.widgetWarn('请先设置歌词！');
        return;
    }
    if (statuss == false) {
        this.emit('onError', '请先开始推送！')
        this.widgetWarn('请先开始推送');
        return;
    }
    statuss = false;
    paused = true;
    clearObject();
}

function start(addingSeconds) {
    // console.log(globalObject)
    if (setted == false) {
        this.emit('onError', '请先设置歌词！')
        this.widgetWarn('请先设置歌词再！');
        return;
    }
    if (statuss == true) {
        this.emit('onError', '已经在推送了！')
        this.widgetWarn('已经在推送了！！');
        return;
    }
    paused = false;
    statuss = true;
    const lines = polyfillForCoco();
    let addingSecond = addingSeconds;
    lines.forEach((line, i) => {
        const match = line.match(/\[(\d+:\d+\.\d+)\](.*)/);
        if (match) {
            const [, time, content] = match;
            const [minutes, seconds] = time.split(':')
                .map(parseFloat);
            const totalSeconds = minutes * 60 + seconds - addingSecond;
            if ((minutes * 60 + seconds) < addingSecond) return;
            const timeoutId = setTimeout(() => {
                // console.log(666);
                if (!paused) {
                    // this.emit('onPush', content.trim(), i + 1);
                    // console.log(777);
                    tuishong(content.trim(), i + 1)
                }
            }, totalSeconds * 1000);
            addToGlobalObject(i, timeoutId);
        }
    });
}

function addToGlobalObject(key, timeoutId) {
    globalObject[key] = timeoutId;
}

function clearObject() {
    Object.values(globalObject)
        .forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
    while (globalObject.length > 0) {
        globalObject.pop();
    }
    globalObject = {};
}

function polyfillForCoco() {
    /* 特别说明： coco在将源字符串重新保存为变量时，会把\n变成 \\n导致分割失败，这个函数是一个hack意味的修复*/
    let singleSplit = lyric.split('\n');
    let doubleSplit = lyric.split('\\n');
    if (singleSplit.length >= doubleSplit.length) {
        return singleSplit;
    } else {
        return doubleSplit;
    }
}


//歌词解析完成
function finishgechi() {
    lilist = document.querySelectorAll('.body .gechi .gechiwenzi li')
    // gechiul = document.querySelector('.body .gechi .gechiwenzi')
    lilist[1].style.marginTop = `${body.offsetHeight / 2}px`

}