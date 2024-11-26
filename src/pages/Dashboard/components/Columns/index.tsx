import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import {ICandidateData} from "~/interfaces/candidate-data.ts";
import {StatusEnum} from "~/enums/status.ts";

const allColumns = [
  { status: StatusEnum.REVIEW, title: "Pronto para revisar" },
  { status: StatusEnum.APPROVED, title: "Aprovado" },
  { status: StatusEnum.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: ICandidateData[]
};

const Collumns = (props: Props) => {
  const { registrations } = props

  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  if (registration.status === collum.status) {
                    return (
                        <RegistrationCard
                            data={registration}
                            key={registration.id}
                        />
                    );
                  }
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
