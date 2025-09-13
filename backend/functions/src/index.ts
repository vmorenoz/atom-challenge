import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import corsMiddleware from './middleware/cors';
import {TaskController, UserController} from './controllers';
import {authRequired} from "./middleware/auth";

// For cost control and performance
setGlobalOptions({ maxInstances: 10 });

// Initialize controllers
const userController = new UserController();
const taskController = new TaskController();

// User Functions
export const findUser = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      await userController.findUser(req, res);
    });
  }
);

export const addUser = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      await userController.addUser(req, res);
    });
  }
);

// Task Functions
export const getTasks = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, () => {
        authRequired(req, res, async () => {
            if (req.method !== 'GET') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            await taskController.getTasks(req, res);
        })
    });
  }
);

export const addTask = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, () => {
        authRequired(req, res, async () => {
            if (req.method !== 'POST') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            await taskController.addTask(req, res);
        })
    });
  }
);

export const updateTask = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, () => {
        authRequired(req, res, async () => {
            if (req.method !== 'PUT') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            await taskController.updateTask(req, res);
        })
    });
  }
);

export const deleteTask = onRequest(
  { cors: true },
  async (req, res) => {
    corsMiddleware(req, res, () => {
        authRequired(req, res, async () => {
            if (req.method !== 'DELETE') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            await taskController.deleteTask(req, res);
        })
    });
  }
);
