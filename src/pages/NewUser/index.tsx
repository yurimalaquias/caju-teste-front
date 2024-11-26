import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import {HiOutlineArrowLeft} from "react-icons/hi";
import {IconButton} from "~/components/Buttons/IconButton";
import {useHistory} from "react-router-dom";
import routes from "~/router/routes";
import {useCandidateInsert} from "~/hooks/useCandidateInsert.ts";
import {ICandidateData} from "~/interfaces/candidate-data.ts";
import {StatusEnum} from "~/enums/status.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {clearCPF, formatCPF, gerarId, isValidCPF, validateEmail, validateName} from "~/utils";

type InputData = {
  value: string;
  error?: string;
}

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const [name, setName] = useState<InputData>({value: ""});
  const [email, setEmail] = useState<InputData>({value: ""});
  const [cpf, setCPF] = useState<InputData>({value: ""});
  const [admissionDate, setAdmissionDate] = useState<InputData>({value:""});
  const [formErrors, setFormErrors] = useState({});

  const { mutate, isSuccess } = useCandidateInsert()

  const CPF_MASK_LENGTH = 14
  const CPF_LENGTH = 11

  const handleSubmit = () => {
    if (!formIsValid()) return
    const cpfCleared = clearCPF(cpf.value)

    const body: ICandidateData = {
      admissionDate: admissionDate.value,
      cpf: cpfCleared,
      email: email.value,
      employeeName: name.value,
      status: StatusEnum.REVIEW,
      id: gerarId()
    }

    mutate(body);
  }

  useEffect(() => {
    if (isSuccess) goToHome()
  }, [isSuccess]);

  const formIsValid = (): boolean => {
    const arrErrors: Partial<ICandidateData> = {}
    if (!name) arrErrors.employeeName = 'Name is required';
    if (!validateName(name.value)) arrErrors.employeeName = 'Preencha o Nome completo';

    if (!email) arrErrors.email = 'Email is required';
    if (!validateEmail(email.value)) arrErrors.email = 'Invalid email address';

    if (!cpf) arrErrors.cpf = 'CPF is required';
    if (!isValidCPF(cpf.value)) arrErrors.cpf = 'CPF Invalido';

    if (!admissionDate) arrErrors.admissionDate = 'Admission Date is required';

    setFormErrors(arrErrors);
    console.log('Lista de erros:', arrErrors);

    return Object.keys(arrErrors).length === 0;
  }

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatedCPF = formatCPF(e.target.value);
    setCPF({value: formatedCPF, error: undefined})

    if (formatedCPF.replace(/\D/g, '').length === 0) {
      setCPF({value: formatedCPF, error: 'O CPF é obrigatorio'});
    }

    if (formatedCPF.replace(/\D/g, '').length === CPF_LENGTH && !isValidCPF(formatedCPF)) {
      setCPF({value: formatedCPF, error: 'O CPF informado é invalido'});
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName({value: e.target.value, error: undefined})

    if(e.target.value.length === 0)
      setName({value: e.target.value, error: 'O Nome é obrigatorio'})

    if (!validateName(e.target.value)) {
      setName({value: e.target.value, error: 'Preencha o Nome completo'})
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({value: e.target.value, error: undefined})

    if(e.target.value.length === 0)
      setEmail({value: e.target.value, error: 'O Email é obrigatorio'})

    if (!validateEmail(e.target.value)) {
      setEmail({value: e.target.value, error: 'Preencha o Email corretamente'})
    }
  }

  const handleAdmissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmissionDate({value: e.target.value, error: undefined})

    if(e.target.value.length === 0)
      setAdmissionDate({value: e.target.value, error: 'A Data de Admissao é obrigatoria'})
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome"
                   value={name?.value}
                   onChange={handleNameChange}
                   error={name.error ?  name.error : ''}
        />
        <TextField placeholder="Email" label="Email" type="email"
                   value={email.value}
                   onChange={handleEmailChange}
                   error={email.error ?  email.error : ''}
        />
        <TextField placeholder="CPF"
                   label="CPF"
                   value={cpf.value}
                   onChange={handleCPFChange}
                   maxLength={CPF_MASK_LENGTH}
                   error={cpf.error ?  cpf.error : ''}
        />
        <TextField label="Data de admissão" type="date"
                   value={admissionDate.value}
                   onChange={handleAdmissionChange}
                   error={admissionDate.error ? admissionDate.error : ''}
        />
        <Button onClick={() => handleSubmit()}>Cadastrar</Button>
      </S.Card>

      {Object.keys(formErrors).length > 0 && (<h2>ERROS:</h2>)}
      {Object.keys(formErrors).length > 0 && (JSON.stringify(formErrors))}
    </S.Container>
  );
};

export default NewUserPage;
