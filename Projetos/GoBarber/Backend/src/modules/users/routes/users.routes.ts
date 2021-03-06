import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import avatarConfig from '@configs/uploadAvatar.config';
import autheticated from '@shared/infra/http/middleware/autenticacao';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();
const upload = multer(avatarConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

router.get('/', usersController.list);

router.patch(
  '/avatar',
  autheticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default router;
