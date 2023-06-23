export const response = (message, status) => {
  return new Response(JSON.stringify({ message: message }), {
    status: status,
  });
};
