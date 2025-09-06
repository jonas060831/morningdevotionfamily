const validEmail = (email: string):boolean => {
  // Basic email regex pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default validEmail