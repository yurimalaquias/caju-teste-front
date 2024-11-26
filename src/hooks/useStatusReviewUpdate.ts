import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {API_URL} from "~/constants/links.const.ts";

const submit = async (data: {id: string, status: string}) => {
    return await axios.patch(`${API_URL}/registrations/${data.id}`, {
        status: data.status
    })
}

export function useStatusReviewUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidate-get-param-key"] })
        }
    })
}