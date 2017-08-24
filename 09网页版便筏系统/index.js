var note = {
    util: {}, //存放基础工具的方法
    operate: {} //存放便筏相关的操作
};

note.util = {
    $: function (value, node) {
        return (node || document).querySelector(value);
    },
    dateFormat: function (ms) {
        /*格式化时间*/
        var d = new Date(ms);
        var pad = function (s) {
            if (s.toString().length === 1) {
                s = '0' + s;
            }
            return s;
        }
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();

        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();

        return year + '-' + pad(month) + '-' + pad(date) + ' ' + pad(hour) + ':' + pad(minute) + ':' + pad(second);
    }
};

note.operate = {
    /*本地存储的关键字*/
    keyItem: 'stickyNote',

    /*根据便筏的id来获取note*/
    get: function (id) {
        var notes = this.getNotes();
        return notes[id] || {};
    },

    /*设置一个note的id及其内容*/
    set: function (id, content) {
        var notes = this.getNotes();
        if (notes[id]) {
            Object.assign(notes[id], content);
        } else {
            notes[id] = content;
        }
        localStorage[this.__store_key] = JSON.stringify(notes);
        console.log('saved note: id: ' + id + ' content: ' + JSON.stringify(notes[id]));
    },

    /*根据id删除对应的便筏*/
    remove: function (id) {
        var notes = this.getNotes();
        delete notes[id];
        localStorage[this.stickyNote] = JSON.stringify(notes);

    },

    /*获取localStorage中所有的note*/
    getNotes: function () {
        return JSON.parse(localStorage[this.stickyNote] || '{}');
    }
};

/*创建note*/
(function (util, operate) {
    var $ = util.$;
    var movedNote = null;
    var startX;
    var startY;
    var maxZindex = 0;

    var noteTmplate = `
        <i class="u-close"></i>
        <div class="u-title">便筏</div>
        <div class="u-edit" contenteditable="true"></div>
        <div class="u-timeUpdate">
            <span>更新时间：</span>
            <span class="time"></span>
        </div>
    `;

    function Note(options) {
        var note = document.createElement('div');
        note.className = 'm-note';
        note.id = options.id || 'm-note-' + Date.now();
        note.innerHTML = noteTmplate;
        $('.u-edit', note).innerHTML = options.content || '';
        note.style.left = options.left + 'px';
        note.style.top = options.top + 'px';
        note.style.zIndex = options.maxZindex;
        document.body.appendChild(note);
        this.note = note;
        this.updateTime(options.updateTime);
        this.addEvent();
    }

    /*时间更新方法*/
    Note.prototype.updateTime = function (ms) {
        var ts = $('.time', this.note);
        ms = ms || Date.now();
        ts.innerHTML = util.dateFormat(ms);
        this.updateTimeInMs = ms;
    }

    /*便筏保存*/
    Note.prototype.save = function () {
        operate.set(this.note.id, {
            left: this.note.offsetLeft,
            top: this.note.offsetTop,
            zIndex: parseInt(this.note.style.zIndex),
            content: $('.u-edit', this.note).innerHTML,
            updateTime: this.updateTimeInMS
        });
        console.log('note saved');
    }

    /*删除此便筏*/
    Note.prototype.close = function (e) {
        console.log('close note');
        document.body.removeChild(this.note);
    }

    Note.prototype.addEvent = function () {
        var mousedownHandler = function (e) {
            movedNote = this.note;
            startX = e.clientX - this.note.offsetLeft;
            startY = e.clientY - this.note.offsetTop;
            if (parseInt(this.note.style.zIndex) !== maxZindex - 1) {
                this.note.style.zIndex = maxZindex++;
                operate.set(this.note.id, {
                    zIndex: maxZindex - 1
                });
            }
        }.bind(this);

        this.note.addEventListener('mousedown', mousedownHandler);

        var edit = $('.u-edit', this.note);
        var inputTimer;
        var inputHandler = function (e) {
            var content = edit.innerHTML;
            clearTimeout(inputTimer);
            inputTimer = setTimeout(function () {
                var time = Date.now();
                operate.set(this.note.id, {
                    content: content,
                    updateTime: time
                });
                this.updateTime(time);
            }.bind(this), 300);
        }.bind(this);

        edit.addEventListener('input', inputHandler);

        var closeBtn = $('.u-close', this.note);
        var closeHandler = function (e) {
            operate.remove(this.note.id);
            this.close(e);
            closeBtn.removeEventListener('click', closeHandler);
            this.note.removeEventListener('mousedown', mousedownHandler);
        }.bind(this);

        closeBtn.addEventListener('click', closeHandler);
    }


    /*按钮的监听事件*/
    document.addEventListener('DOMContentLoaded', function (e) {
        $('#u-btn-create').addEventListener('click', function (e) {
            var note = new Note({
                left: Math.round(Math.random() * (window.innerWidth - 220)),
        top: Math.round(Math.random() * (window.innerHeight - 320)),
                zIndex: maxZindex++
            });
            note.save();
        });

        /*按钮的按下事件*/
        function mousemoveHandler(e) {
            // console.log(e)e
            if (!movedNote) {
                return;
            }
            movedNote.style.left = e.clientX - startX + 'px';
            movedNote.style.top = e.clientY - startY + 'px';
        }

        function mouseupHandler(e) {
            if (!movedNote) {
                return;
            }
            operate.set(movedNote.id, {
                left: movedNote.offsetLeft,
                top: movedNote.offsetTop
            });
            movedNote = null;
        }
        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);

        /*初始化*/
        var notes = operate.getNotes();
        Object.keys(notes).forEach(function (id) {
            var options = notes[id];
            if (maxZindex < options.zIndex) {
                maxZindex = options.zIndex;
            }
            new Note(Object.assign(options, {
                id: id
            }));
            maxZindex += 1;
        })
    });
})(this.note.util, this.note.operate);