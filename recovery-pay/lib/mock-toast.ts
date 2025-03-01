// Mock implementation of toast
const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.log('Error:', message),
  info: (message: string) => console.log('Info:', message),
  warning: (message: string) => console.log('Warning:', message),
};

export default toast; 