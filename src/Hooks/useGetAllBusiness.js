import { httpClient } from "../Services/http-client";
import { useRequest } from "./use-request";

export async function GetAllBusiness()
{
    const res = (
        await httpClient({
        url: 'api/business/getall',     
        })
    ).data;

    return res.data
}

export const useBusiness = () => {
    return useRequest(['Business'], GetAllBusiness);
}