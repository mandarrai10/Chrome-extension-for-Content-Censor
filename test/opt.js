function buildSaveArray() {
    var saveArray = [];
    var element = document.querySelectorAll('.keyword-row');

    for (var i = 0; i < element.length; i++) {
        var obj = {};
        obj.keyword = element[i].querySelector('.keyword input').value;
        obj.type = element[i].querySelector('.type select').value;
        obj.replace = element[i].querySelector('.replace input').value;
        saveArray.push(obj);
    }

    save_options(saveArray);
}

function save_options(saveArray) {
    chrome.storage.sync.set({ keywordsArray: saveArray }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({ keywordsArray: [] }, function (items) {
        buildOptDisplay(items.keywordsArray);
    });
}

function buildOptDisplay(items) {
    if (items.length == 0) {
        document.querySelector('.add-keyword').click();
    }

    for (var i = 0; i < items.length; i++) {
        if (typeof items[i] === 'object') {
            createRowWithOptions(items[i], i);
        }
    }
}

function createRowWithOptions(obj, int = 0) {
    var keywordRow = document.querySelector('.keyword-row').innerHTML;

    if (typeof document.querySelector('.keyword-row').dataset.id === 'undefined') {
        document.querySelector('.keyword-row').remove();
    }

    var newRow = document.createElement('div');
    newRow.className = 'keyword-row';
    var timestamp = Date.now() + int;
    newRow.dataset.id = timestamp;
    newRow.innerHTML = keywordRow;
    document.querySelector('.keywords-holder').appendChild(newRow);

    var newEle = document.querySelector('.keywords-holder .keyword-row[data-id="' + timestamp + '"]');
    newEle.querySelector('.keyword input').value = obj.keyword;
    newEle.querySelector('.type select').value = obj.type;

    if (obj.type == '1') {
        newEle.querySelector('.replace').style.display = 'block';
        newEle.querySelector('.replace input').value = obj.replace;
    } else {
        newEle.querySelector('.replace').style.display = 'none';
    }

    newEle.querySelector('.type select').addEventListener('change', function (e) {
        var element = e.target;
        var parent = element.parentNode.parentNode;

        if (element.value == '1') {
            parent.querySelector('.replace').style.display = 'block';
        } else {
            parent.querySelector('.replace').style.display = 'none';
        }
    });

    newEle.querySelector('.remove').addEventListener('click', function (e) {
        newEle.remove();
    });
}

document.querySelector('.add-keyword').addEventListener('click', function () {
    var obj = { keyword: 'example', type: '1', replace: 'string' };
    createRowWithOptions(obj);
});

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', buildSaveArray);
