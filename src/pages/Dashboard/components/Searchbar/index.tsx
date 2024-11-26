import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import React, {ChangeEvent, useEffect, useState} from "react";
import {clearCPF, formatCPF, isValidCPF} from "~/utils";

type ChildProps = {
    onValidCPF: (value: string) => void;
    callRefetch: (retry: boolean) => void;
}

export const SearchBar: React.FC<ChildProps> = ({ onValidCPF, callRefetch }) => {
    const [cpf, setCpf] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const CPF_LENGTH = 11
    const CPF_MASK_LENGTH = 14

    const history = useHistory();

    const goToNewAdmissionPage = () => {
        history.push(routes.newUser)
    };

    const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatedCPF = formatCPF(e.target.value);
        setCpf(formatedCPF);

        if (formatedCPF.replace(/\D/g, '').length === CPF_LENGTH) {
            setIsValid(isValidCPF(formatedCPF))
        } else {
            setIsValid(false)
        }

        if (formatedCPF.replace(/\D/g, '').length === 0) {
            sendRetry()
        }
    }

    const sendValue = (value: string) => {
        onValidCPF(clearCPF(value))
    }

    const sendRetry = () => {
        sendValue('');
        callRefetch(true)
    }

    useEffect(() => {
        if (isValid) {
            sendValue(cpf);
        }
    }, [isValid]);
  
  return (
    <S.Container>
      <TextField
          placeholder="Digite um CPF válido"
          type="text"
          value={cpf}
          onChange={handleCPFChange}
          maxLength={CPF_MASK_LENGTH}
          error={isValid ? '' : "CPF inválido"}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={() => sendRetry} />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
