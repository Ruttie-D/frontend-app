import { jwtDecode } from "jwt-decode"
import { TDecodeToken } from "../Types/TDecodeToken";

export const decode = (token: string) => {
    return jwtDecode(token) as TDecodeToken;
};