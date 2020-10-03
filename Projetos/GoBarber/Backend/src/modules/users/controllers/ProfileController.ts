import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const service = container.resolve(UpdateUserService);

    const user = await service.execute({
      id: request.user.id,
      name,
      email,
      password,
      old_password,
    });

    const tempUser = Object.assign(user);

    delete tempUser.password;

    return response.status(201).send(tempUser);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ShowUserService);

    const user = await service.execute({
      id: request.user.id,
    });

    const tempUser = Object.assign(user);

    delete tempUser.password;

    return response.status(201).send(tempUser);
  }
}
