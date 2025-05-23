import { jwtDecode } from 'jwt-decode';

export function extractSubFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.sub) {
      throw new Error('sub not found in token');
    }
    return decoded.sub.toString();
  } catch (err) {
    throw err;
  }
}