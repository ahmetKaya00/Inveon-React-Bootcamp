export default {

  
    create: jest.fn(() => ({
  
    
      get: jest.fn(),
  
  
      post: jest.fn(),
  
  
      put: jest.fn(),
  
  
      delete: jest.fn(),
  
  
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    })),
  };