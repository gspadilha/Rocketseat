import { Router } from 'express';

import schedulesRouter from '@modules/schedules/routes/schedules.routes';
import providersRouter from '@modules/schedules/routes/providers.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordsRouter from '@modules/users/routes/passwords.routes';
import profileRouter from '@modules/users/routes/profile.routes.ts';

const routes = Router();

routes.use('/schedules', schedulesRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profileRouter);

export default routes;
