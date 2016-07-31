import express from 'express';
import { router as vim } from './router/vim';
import ejsTemplateEngine from 'ejs';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 8080;

app.use(vim);

app.engine('ejs', ejsTemplateEngine.renderFile);
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, (err) => {
    if (err) return console.log(err);

    console.log(`listen success with ${port}`);
});
