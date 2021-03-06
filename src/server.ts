import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import BooksRoute from './routes/books.route';
import validateEnv from '@utils/validateEnv';
import UserService from './services/users.service';
import BorrowHistoryRoute from './routes/borrowHistory.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new BooksRoute(),
    new BorrowHistoryRoute()
], new UserService());

app.listen();
