// import axios from 'axios'

(function () {
    // const axios = require('axios');
    setpage.children[0].children[0].addEventListener('focus', function () {
        pagenow = this.value
    })
    setpage.children[0].children[0].addEventListener('blur', function () {
        if (pagenow !== this.value && this.value > 0) {
            get_page(searchtext.value, this.value, 10, reasontext, setpage)
        }
    })
    setpage.children[1].children[0].addEventListener('click', function () {
        if (setpage.children[0].children[0].value > 1) {
            setpage.children[0].children[0].value--
            get_page(searchtext.value, setpage.children[0].children[0].value, 10, reasontext, setpage)
        }

    })
    setpage.children[1].children[1].addEventListener('click', function () {
        if (setpage.children[0].children[0].value > 0) {
            setpage.children[0].children[0].value++
            get_page(searchtext.value, setpage.children[0].children[0].value, 10, reasontext, setpage)
        }

    })



    // reasontext.innerHTML
    searchbutton.addEventListener('click', function () {
        if (searchtext.value) {
            get_page(searchtext.value, 1, 10, reasontext, setpage)
        }
        else {
            searchtext.value = '请输入文字'

        }
    })
    reasontext.addEventListener('click', function (e) {
        // console.log(e);
        if (e.target.dataset.id || e.target.parentNode.dataset.id) {
            get_id(e.target.dataset.id)
        }
    })
    searchtext.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            get_page(searchtext.value, 1, 10, reasontext, setpage)
        }
    })
})()

function get_id(key) {
    axios.get('https://www.lihouse.xyz/coco_widget/music_resource/id/' + key).then(response => {
        let raw = response.data
        // console.log(raw);
        play_listnew(raw)
    }, error => {
        this.widgetError(error)
    })

}

function get_page(key, page, limit, reasontext, setpage) {
    axios.get('https://www.lihouse.xyz/coco_widget/music_resource/info?key=' + key + '&page=' + page + '&limit=' + limit).then(response => {
        let raw = response.data
        if (raw['status']) {
            // console.log(reasontext.children[1]);
            let li = reasontext.children[1].cloneNode(true);
            // console.log(li.children[0]);
            reasontext.innerHTML = ''
            setpage.style.display = 'flex'
            for (let i = 0; i < raw['song_data'].length; i++) {
                // console.log(li.children[0]);
                li.children[0].innerHTML = raw['song_data'][i]['name']
                li.dataset.id = raw['song_data'][i]['id']
                let artist = '';
                for (let j = 0; j < raw['song_data'][i]['artist'].length; j++) {
                    artist += raw['song_data'][i]['artist'][j]
                    // console.log(artist);
                }
                if (artist.length >= 10) {
                    artist = artist.slice(0, 10)
                }
                li.children[1].innerHTML = (artist + '-' + raw['song_data'][i]['album'])
                reasontext.appendChild(li)
                li = reasontext.children[0].cloneNode(true);
            }
        }
    }, error => {
        this.widgetError(error)
    })
}