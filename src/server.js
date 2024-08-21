import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Rutas
import productsRouter from './routes/products-routes.js';
import viewsRouter from './routes/views-routes.js';
import userRouter from './routes/user-routes.js';
import authRouter from './routes/auth-routes.js';
import cartRouter from './routes/carts-routes.js';
import { initMongoDB } from './db/mongoDb.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/path.js";
import hbs from "./utils/handlebarsHbs.js";
import { initializePassport } from "./config/passportConfig.js";

const app = express();

// Configuración del puerto
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

initializePassport();
app.use(passport.initialize());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use('/', viewsRouter);


app.use(errorHandler);

initMongoDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
