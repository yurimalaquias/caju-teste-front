import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import {StatusEnum} from "~/enums/status.ts";
import {useStatusReviewUpdate} from "~/hooks/useStatusReviewUpdate.ts";
import {useCandidateDelete} from "~/hooks/useCandidateDelete.ts";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
    const canReview = [StatusEnum.APPROVED, StatusEnum.REPROVED]
    const canApproveReprove = [StatusEnum.REVIEW]

    const { mutate: reviewUpdateMutate } = useStatusReviewUpdate()
    const { mutate: deleteMutate } = useCandidateDelete()

    const handleUpdateStatus = (id: string, status: StatusEnum) => {
        reviewUpdateMutate({ id: id, status: status })
    }

    const handleDeleteCandidate = (id: string) => {
        deleteMutate({ id: id })
    }

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
          {canApproveReprove.includes(props.data.status) &&
              <ButtonSmall bgcolor="rgb(255, 145, 154)"
                           onClick={() => handleUpdateStatus(props.data.id, StatusEnum.REPROVED)}>Reprovar</ButtonSmall> }
          {canApproveReprove.includes(props.data.status) &&
              <ButtonSmall bgcolor="rgb(155, 229, 155)"
                           onClick={() => handleUpdateStatus(props.data.id, StatusEnum.APPROVED)}>Aprovar</ButtonSmall> }
          {canReview.includes(props.data.status) &&
              <ButtonSmall bgcolor="#ff8858"
                           onClick={() => handleUpdateStatus(props.data.id, StatusEnum.REVIEW)}>Revisar novamente</ButtonSmall> }
        <HiOutlineTrash onClick={() => handleDeleteCandidate(props.data.id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
