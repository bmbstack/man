import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();
const VIM_RAW_URL = 'https://raw.githubusercontent.com/bmbstack/dotfiles/master/.vimrc';

router.get('/vim', (req, res) => {
    fetch(VIM_RAW_URL)
        .then((response) => response.text())
        .then((text) => {
            let lines = text.split('\n');
            let titleRegexp = /^"=+begin\((.+)\)=+"$/igm;
            let contentRegexp = /^.*(?:[inv]?(?:nore)?map)\s(.+)\s([^"]+)(?:"(.+))?$/igm;

            lines.map((line) => {
                if (titleRegexp.test(line)) {
                    console.log(line)
                }
                if (contentRegexp.test(line)) {
                    console.log(line)
                }
            });
            
            res.render('man');
        });
});

export {
    router
};
