import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useCandidateParamGet} from "~/hooks/useCandidateGet.ts";
import { useState} from "react";

const DashboardPage = () => {
    const [cpf, setCPF] = useState<string>('');
    const { data, isLoading, isError, refetch } = useCandidateParamGet(cpf);

    const handleFilterCPF = (cpf: string) => {
        setCPF(cpf)
    }

    const handleRefetch = (refresh: boolean) => {
        if (refresh) refetch()
    }

    return (
    <S.Container>
      <SearchBar callRefetch={handleRefetch} onValidCPF={handleFilterCPF}/>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error!</p>}
        {!isLoading &&
             <Collumns registrations={data} />
        }
    </S.Container>
  );
};

export default DashboardPage;
