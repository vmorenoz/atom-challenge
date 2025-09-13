import {Response} from 'express';
import * as logger from 'firebase-functions/logger';

export abstract class BaseController {
  protected handleError(res: Response, error: Error): void {
    logger.error('Error occurred:', error);
    
    let statusCode = 500;
    let message = 'Internal server error';

    if (error.message.includes('not found') || error.message.includes('Not found')) {
      statusCode = 404;
      message = error.message;
    } else if (
      error.message.includes('required') ||
      error.message.includes('Invalid') ||
      error.message.includes('cannot be empty') ||
      error.message.includes('already exists')
    ) {
      statusCode = 400;
      message = error.message;
    }

    res.status(statusCode).json({
      success: false,
      error: {
        message,
        code: statusCode
      }
    });
  }

  protected sendSuccess<T>(res: Response, data: T, message?: string): void {
    res.status(200).json({
      success: true,
      data,
      message: message || 'Operation completed successfully'
    });
  }

  protected sendCreated<T>(res: Response, data: T, message?: string): void {
    res.status(201).json({
      success: true,
      data,
      message: message || 'Resource created successfully'
    });
  }
}