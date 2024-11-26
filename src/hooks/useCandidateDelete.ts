import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {API_URL} from "~/constants/links.const.ts";

const submit = async (data: {id: string}) => {
    return await axios.delete(`${API_URL}/registrations/${data.id}`)
}

export function useCandidateDelete() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidate-get-param-key"] })
        }
    })
}