import { useCommentCreate } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate, Modal } from "antd";
import { ICommentWriteProps } from "./types";
const IMAGE_SRC = {
  chatImage: {
    src: require("@assets/chat.png"),
    alt: "댓글아이콘",
  },
  starsImage: {
    src: require("@assets/fivestars.png"),
    alt: "평점",
  },
};
export default function CommentWrite({
  isCommentEdit,
  comment,
  setIsCommetEdit,
}: ICommentWriteProps) {
  const {
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
    starCount,
    setStarCount,
    onChangeStarCount,
    modalContent,
    isModalOpen,
    handleCancel,
    handleOk,
    editComment,
  } = useCommentCreate(isCommentEdit ? comment : null, setIsCommetEdit);
  {
    console.log("isCommentEdit", isCommentEdit);
  }
  return (
    <>
      <div className={isCommentEdit ? "" : styles.commentListFrame}>
        <div className={styles.commentListContainer}>
          <div className={styles.commentListBody}>
            {!isCommentEdit && (
              <>
                <div className={styles.borderLine}></div>
                <div className={styles.title}>
                  <Image
                    src={IMAGE_SRC.chatImage.src}
                    alt={IMAGE_SRC.chatImage.alt}
                  />
                  <div>댓글</div>
                </div>
              </>
            )}

            <div>
              <Rate
                onChange={(e) => onChangeStarCount(e)}
                defaultValue={isCommentEdit ? comment?.rating : 0}
              />
            </div>
            <div className={styles.commentUserInput}>
              <div className={styles.userTitle}>
                <div className={styles.title}>
                  <div>작성자</div>
                  <div className={styles.aster}> *</div>
                </div>
                <div>
                  <input
                    value={commentWriter}
                    // value={isCommentEdit ? comment?.writer || "" : commentWriter}
                    onChange={onChangeWriter}
                    placeholder="작성자 명을 입력해 주세요."
                    className={
                      isCommentEdit
                        ? styles.readonlyInput
                        : styles.commentWriterInput
                    }
                    type="text"
                    readOnly={isCommentEdit ? true : false}
                  />
                </div>
              </div>
              <div className={styles.userTitle}>
                <div className={styles.title}>
                  <div>비밀번호</div>
                  <div className={styles.aster}> *</div>
                </div>
                <input
                  value={commentPassword}
                  onChange={onChangePW}
                  placeholder="비밀번호를 입력해 주세요."
                  className={styles.commentWriterInput}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.commentInputBody}>
              <textarea
                value={commentText}
                // value={commentText}
                onChange={onChangeText}
                className={styles.commentInput}
                placeholder="댓글을 입력해 주세요."
              />
              <div className={styles.inputTextCount}>
                {isCommentEdit ? comment?.contents.length : commentText?.length}{" "}
                / 200
              </div>
            </div>
            <div className={styles.buttonBody}>
              {isCommentEdit ? (
                <div className={styles.isEditButtonBody}>
                  <button
                    className={styles.isEditCancelButton}
                    onClick={() => setIsCommetEdit(false)}
                  >
                    취소
                  </button>
                  <button
                    className={styles.commentEnrollButton}
                    onClick={editComment}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <button
                  disabled={isButtonDisabled}
                  className={styles.commentEnrollButton}
                  onClick={createComment}
                >
                  댓글 등록
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}
