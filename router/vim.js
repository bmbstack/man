import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();
const VIM_RAW_URL = 'https://raw.githubusercontent.com/bmbstack/dotfiles/master/.vimrc';

router.get('/vim', (req, res) => {
    fetch(VIM_RAW_URL)
        .then((response) => response.text())
        .then((text) => {
            res.render('man');
        });
});

export {
    router
};
