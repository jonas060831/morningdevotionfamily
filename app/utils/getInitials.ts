const getInitials = (name: string) => {
  if (!name) return "";

  const parts = name.trim().split(/\s+/); // split by spaces
  if (parts.length === 1) {
    return parts[0][0].toUpperCase(); // single name, just first letter
  }

  const first = parts[0][0].toUpperCase();
  const last = parts[parts.length - 1][0].toUpperCase();

  return first + last;
}

export default getInitials