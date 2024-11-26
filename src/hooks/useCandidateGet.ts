import {useQuery} from "@tanstack/react-query";
import axios, {AxiosPromise} from "axios";
import {ICandidateData} from "~/interfaces/candidate-data.ts";
import {API_URL} from "~/constants/links.const.ts";

// TODO: Criar um arquivo de ENUMS para evitar Magic Numbers
// https://refactoring.guru/pt-br/replace-magic-number-with-symbolic-constant
const CPF_LENGTH = 11

const fetchCandidateParamData = async (cpf: string): AxiosPromise<ICandidateData[]> => {
    const cpfParam = cpf.length === CPF_LENGTH ? `?cpf=${cpf}` : ''
    return await axios.get<ICandidateData[]>(`${API_URL}/registrations${cpfParam}`);
}

/*
* Foram adicionados os parametros, para que o botao de refresh fosse desenvolvido.
*  - refetchOnWindowFocus: false,
*  - enabled: false
*
* Utilizando o ReactQuery nao precisamos utilizar a logica de botao de refresh uma vez que ele mesmo
* se encarrega de atualizar os dados de acordo com os parametros.
* Exp: Apos um Insert podemos definir => queryClient.invalidateQueries({ queryKey: ["candidate-get-key"] })
* */
export function useCandidateParamGet(cpf: string) {
    const query = useQuery({
        queryKey: ['candidate-get-param-key', cpf],
        queryFn: () => fetchCandidateParamData(cpf),
        // refetchOnWindowFocus: false,
        // enabled: false
    })

    return {
        ...query,
        data:query.data?.data
    }
}