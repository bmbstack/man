import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();
const VIM_RAW_URL = 'https://raw.githubusercontent.com/bmbstack/dotfiles/master/.vimrc';
const EMPTY_COMMENT = '';

function textReader(text) {
    let index = 0;
    let lines = text.split('\n');

    return {
        nextLine: () => index++ < lines.length ? lines[index] : undefined
    }
}

router.get('/vim', (req, res) => {
    fetch(VIM_RAW_URL)
        .then((response) => response.text())
        .then((text) => {

            let reader = textReader(text);
            let line = reader.nextLine();

            let block = null;
            let list = [];

            while(line != undefined) {
                let titleRegexp = /^"=+begin\((.+)\)=+"$/igm;
                let contentRegexp = /^.*(?:[inv]?(?:nore)?map)\s([^\s]+)\s.*$/igm;

                if (titleRegexp.test(line)) {
                    block = {
                        title: RegExp.$1,
                        rows: []
                    };
                    list.push(block);

                }
                else if (contentRegexp.test(line)) {
                    if (block) {
                        let comment = reader.nextLine() || '';

                        block.rows.push({
                            shortcut: RegExp.$1,
                            comment: comment.startsWith('"') ? comment.slice(1) : EMPTY_COMMENT 
                        });
                    }

                    contentRegexp.compile();
                }

                line = reader.nextLine();
            }

            res.render('man', { list: list });
        })
        .catch((error) => res.end(error.toString()));
});

export {
    router
};
