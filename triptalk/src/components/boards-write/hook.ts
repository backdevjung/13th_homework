import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  MutationUpdateBoardArgs,
  MutationUpdateBoardCommentArgs,
} from "commons/graphql/graphql";
import { IAddress } from "./types";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();

  // let editId = isEdit ? params.boardId.toString() : "";

  //그래프큐엘 셋팅
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [targetId, setTargetId] = useState(
    isEdit ? params.boardId.toString() : ""
  );

  //state 가 캡쳐되서 감
  // state 는 변경을 감지되지 못하나...

  console.log("밖에서 targetId", targetId);

  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: targetId.toString() },
    skip: !isEdit,
  });

  const [password, setPassword] = useState<string>("");

  const [formData, setFormData] = useState({
    name: isEdit ? data?.fetchBoard?.writer || "" : "",
    title: isEdit && data?.fetchBoard?.title ? data?.fetchBoard.title : "",
    content:
      isEdit && data?.fetchBoard.contents ? data?.fetchBoard.contents : "",
  });

  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [zonecode, setZonecode] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.zipcode || "" : ""
  );
  const [address, setAddress] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.address || "" : ""
  );
  const [detailAddress, setDetailAddress] = useState<string>(
    isEdit && data?.fetchBoard?.boardAddress?.addressDetail
      ? data.fetchBoard.boardAddress.addressDetail
      : ""
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    isEdit && data?.fetchBoard?.youtubeUrl ? data.fetchBoard.youtubeUrl : ""
  );
  //모달 보여주는 여부 값
  const [afterSubmitModal, setAfterSubmitModal] = useState<boolean>(false);

  //모달의 content 내용
  const [modalContent, setModalContent] = useState<string>("");

  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !name || !password || !title || !content;
  // 새로고침해도 초기값 유지하기 -> 다음주에 배워요.
  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        name: data.fetchBoard.writer || "",
        title: data.fetchBoard.title || "",
        content: data.fetchBoard.contents || "",
      });
      setZonecode(data.fetchBoard.boardAddress?.zipcode || "");
      setAddress(data.fetchBoard.boardAddress?.address || "");
      setDetailAddress(data.fetchBoard.boardAddress?.addressDetail || "");
      setYoutubeUrl(data.fetchBoard.youtubeUrl || "");
    }
  }, [data, isEdit]);
  // 변경값 상태관리

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeField =
    (field: "name" | "title" | "content") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };
  const onChangeName = onChangeField("name");
  const onChangeTitle = onChangeField("title");
  const onChangeContent = onChangeField("content");

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleOk = () => {
    // 수정이 완료 되어도 , 새로운 게시글이 등록 되어도 detail 화면으로 이동
    console.log("editId:::", targetId);
    router.push(`/boards/${targetId}`);
  };

  const handleCancel = () => {
    setAfterSubmitModal(false);
  };

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (isEdit === false) {
      let hasError = false;

      if (formData.name.trim() === "") {
        setNameError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setNameError("");
      }

      if (password.length === 0) {
        setPasswordError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (!formData.title?.trim()) {
        setTitleError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setTitleError("");
      }

      if (!formData.content?.trim()) {
        setContentError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setContentError("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: formData.name,
              password: password,
              title: formData.title,
              contents: formData.content,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: zonecode,
                address: address,
                addressDetail: detailAddress,
              },
              images: ["", ""],
            },
          },
        });
        if (data?.createBoard) {
          setTargetId(data.createBoard._id);
          console.log("data", data);
          setModalContent("게시글이 등록되었습니다!");
          setAfterSubmitModal(true);
        }
      }
    }

    // 기존의 글을 수정하는 경우
    else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (formData.title?.trim() === "" && formData?.content?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        setTitleError("필수입력 사항입니다.");
        return;
      }
      if (formData?.content?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        return;
      }
      if (formData?.title?.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기

      const 입력받은비밀번호 = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );
      const updateInput: any = {
        boardAddress: {
          zipcode: "",
          address: "",
          addressDetail: "",
        },
      };
      if (
        formData.title?.trim() &&
        formData.title !== data?.fetchBoard?.title
      ) {
        updateInput.title = formData.title;
      }

      if (
        formData.content?.trim() &&
        formData.content !== data?.fetchBoard?.contents
      ) {
        updateInput.contents = formData.content;
      }
      // youtube 주소 변경 확인
      if (youtubeUrl?.trim() && youtubeUrl !== data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = youtubeUrl;
      }
      //주소처리
      if (
        zonecode?.trim() &&
        zonecode !== data?.fetchBoard?.boardAddress?.zipcode
      ) {
        updateInput.boardAddress.zipcode = zonecode;
      }
      if (
        address?.trim() &&
        address !== data?.fetchBoard?.boardAddress?.address
      ) {
        updateInput.boardAddress.address = address;
      }
      if (
        detailAddress?.trim() &&
        detailAddress !== data?.fetchBoard?.boardAddress?.addressDetail
      ) {
        updateInput.boardAddress.addressDetail = detailAddress;
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: targetId,
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            setModalContent("수정이 완료 되었습니다");
            setAfterSubmitModal(true);
          } else {
            console.log("수정에 실패하는경우");
            setModalContent("수정에 실패하였습니다");
            setAfterSubmitModal(true);
          }
        } catch (error: any) {
          // 에러 발생 시 처리
          const errMsg = (error as ApolloError).graphQLErrors[0] as any;
          if (errMsg) {
            setModalContent(errMsg.message);
            setAfterSubmitModal(true);
          } else {
            console.error("네트워크에러 발생");
            setModalContent("네트워크에러 발생하였습니다. 재시도 해주세요.");
            setAfterSubmitModal(true);
          }
        }
      } else {
        setModalContent("수정된 내용이 없습니다.");
        setAfterSubmitModal(true);
      }
    }
  };

  const onSearchAddress = () => {
    setIsAddressModalOpen((prevOpenState: boolean) => !prevOpenState);
  };

  const completeHandler = (data: IAddress) => {
    console.log("주소 data", data);
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    setIsAddressModalOpen(false);
  };

  return {
    data,
    nameError,
    password,
    passwordError,

    titleError,
    formData,
    contentError,
    isButtonDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
    afterSubmitModal,
    handleOk,
    handleCancel,
    modalContent,
    setModalContent,
    onSearchAddress,
    isAddressModalOpen,
    completeHandler,
    zonecode,
    address,
    setDetailAddress,
    onChangeDetailAddress,
    detailAddress,
    onChangeYoutubeUrl,
    youtubeUrl,
  };
};
