import Axios from "axios";
import { env, isProd } from "@/lib/env";

const axios = Axios.create({
  baseURL: isProd
    ? env.NEXT_PUBLIC_DEPLOYED_BACKEND_API || env.NEXT_PUBLIC_BACKEND_API
    : env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
