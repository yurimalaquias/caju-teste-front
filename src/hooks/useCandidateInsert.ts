import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {API_URL} from "~/constants/links.const.ts";
import {ICandidateData} from "~/interfaces/candidate-data.ts";

const submit = async (data: ICandidateData) => {
    return await axios.post(`${API_URL}/registrations`, data)
}

export function useCandidateInsert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidate-get-param-key"] })
        }
    })
}