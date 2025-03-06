// import {jwtDecode} from "jwt-decode";

// export const decodeToken = (token: string | null = localStorage.getItem("token")) => {
//   if (!token) {
//     throw new Error("Invalid token: token is null or undefined");
//   }
//   return jwtDecode(token);
// };

// import { jwtDecode } from "jwt-decode";

// export function decodeToken(token: any) {
//   const decodedToken = jwtDecode(token as string);
//   return decodedToken;
// }

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}