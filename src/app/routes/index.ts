import { Router } from 'express';
import { customerRoutes } from '../modules/Customer/customer.routes';
import { bikeRoutes } from '../modules/Bike/bike.routes';
import { serviceRoutes } from '../modules/Service/service.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/customers',
    route: customerRoutes,
  },
  {
    path: '/bikes',
    route: bikeRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
