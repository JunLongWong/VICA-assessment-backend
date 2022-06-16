import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PWD } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { UserRoleType } from './interfaces/userRoleType.enum';
import { UserStatus } from './interfaces/userStatus.enum';
import { SuperAdminSignup } from './interfaces/users.interface';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private createSuperAdmin: SuperAdminSignup; // Dependency Inversion => to achieve loose coupling between UserService & App class

  constructor(routes: Routes[], createSuperAdmin: SuperAdminSignup) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.createSuperAdmin = createSuperAdmin;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public async listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
    await this.initApp();
  }

  public getServer() {
    return this.app;
  }

  // signup a user as SUPER_ADMIN on app initialization
  private async initApp() {
    await this.createSuperAdmin.createUser({
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PWD,
      name: 'JOHN_SUPER_ADMIN',
      role: UserRoleType.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      date_joined: new Date(),
    });
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url, dbConnection.options)
      .then(result => {
        console.log('DB readyState : ' + result.connection.readyState);
        console.log('DB connection host :' + result.connection.host);
        console.log('Connected to database successfully!');
      })
      .catch(err => {
        console.log(err + '\n' + 'Database connection failed! Exiting now...');
      })
      .then(() => {
        return (process.exitCode = 1);
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
