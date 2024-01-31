import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: err.message,
        fields: err.errors
      }
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: {
        message: 'Unauthorized'
      }
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: {
        message: 'Forbidden'
      }
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      error: {
        message: 'Not found'
      }
    });
  }

  return res.status(500).json({
    error: {
      message: 'Internal server error'
    }
  });
};