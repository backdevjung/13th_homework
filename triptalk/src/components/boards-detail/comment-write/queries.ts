import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $boardCommentId: ID!
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String!
  ) {
    updateBoardComment(
      boardCommentId: $boardCommentId
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
    ) {
      _id
      contents
      rating
      updatedAt
    }
  }
`;
