import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from './index';

export const register = (router: Router) => {
  const requestSchema = [
    body('id').exists().isUUID(),
    body('name').exists().isString(),
    body('duration').exists().isString()
  ];

  const coursePutController = container.get('Apps.mooc.controllers.CoursePutController');
  router.put('/courses/:id', requestSchema, validateReqSchema, (req: Request, res: Response) =>
    coursePutController.run(req, res)
  );

  const coursesCounterGetController = container.get('Apps.mooc.controllers.CoursesCounterGetController');
  router.get('/courses-counter', coursesCounterGetController.run.bind(coursesCounterGetController));
};
