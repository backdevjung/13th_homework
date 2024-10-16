"use client";

import { useMutation, useQuery, ApolloError } from "@apollo/client";
import {
  CreateCommentDocument,
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  FetchBoardsDocument,
  UpdateCommentDocument,
} from "commons/graphql/graphql";
import { useParams } from "next/navigation";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
export const useCommentCreate = (
  comment: FetchBoardCommentsQuery["fetchBoardComments"][0] | null,
  setIsCommetEdit: Dispatch<SetStateAction<boolean>>
) => {
  const [newComment] = useMutation(CreateCommentDocument);
  const [updateComment] = useMutation(UpdateCommentDocument);
  const [commentWriter, setCommentWriter] = useState<string>(
    comment?.writer ?? ""
  );
  const [commentPassword, setCommentPassword] = useState("");
  const [commentText, setCommentText] = useState<string>(
    comment?.contents ?? ""
  );
  const [starCount, setStarCount] = useState<number>(comment?.rating ?? 0);

  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const id = params.boardId.toString();

  //비밀번호는 없는것 가능함
  const isButtonDisabled = !commentWriter || !commentText;

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };

  const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const onChangeStarCount = (e: number) => {
    setStarCount(e);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // 댓글 수정일 경우 원래 상태로 돌리기
    if (comment) setIsCommetEdit(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if (comment) setIsCommetEdit(false);
  };

  // 댓글 수정시,
  const editComment = async () => {
    try {
      if (comment) {
        const { data } = await updateComment({
          variables: {
            boardCommentId: comment?._id,
            updateBoardCommentInput: {
              contents: commentText,
              rating: starCount,
            },
            password: commentPassword,
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              // page 번호 하드코딩 됨
              variables: { page: 1, boardId: id },
            },
          ],
        });

        if (data) {
          setModalContent("댓글 수정이 완료 되었습니다");
          setIsModalOpen(true);
        }
      }
    } catch (err: any) {
      const errMsg = (err as ApolloError).graphQLErrors[0] as any;
      console.error(err);
      // 비밀번호가 틀린경우 알려줘야함,
      setModalContent(errMsg.message);
      setIsModalOpen(true);
    }
  };

  const createComment = async () => {
    try {
      const { data } = await newComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentText || "",

            rating: starCount || 0,
          },
          boardId: id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            // page 번호 하드코딩 됨
            variables: { page: 1, boardId: id },
          },
        ],
      });

      if (data?.createBoardComment) {
        // 댓글이 등록된 후, 댓글입력창을 모두 초기화 합니다.
        setCommentText("");
        setCommentWriter("");
        setCommentPassword("");
        setIsModalOpen(true);
        setModalContent("댓글 등록이 완료 되었습니다!");
      } else {
        setModalContent("댓글 등록에 실패하였습니다");
        setIsModalOpen(true);
      }
    } catch (err: any) {
      setModalContent(err);
      setIsModalOpen(true);
      console.error(err);
    }
  };
  return {
    starCount,
    setStarCount,
    isButtonDisabled,
    onChangePW,
    onChangeText,
    onChangeWriter,
    commentWriter,
    setCommentWriter,
    commentPassword,
    setCommentPassword,
    commentText,
    setCommentText,
    createComment,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    handleOk,
    handleCancel,
    onChangeStarCount,
    editComment,
  };
};
