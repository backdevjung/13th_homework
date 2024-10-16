import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import { IcommentList } from "./types";
import { useState } from "react";
import CommentWrite from "../comment-write";
const IMAGE_SRC = {
  profileImage: {
    src: require("@assets/profile_image.png"),
    alt: "프로필이미지",
  },
  starsImage: {
    src: require("@assets/fivestars.png"),
    alt: "평점이미지",
  },
  editImage: {
    src: require("@assets/edit.png"),
    alt: "편집버튼",
  },
  closeImage: {
    src: require("@assets/close.png"),
    alt: "삭제버튼",
  },
};

export default function CommentItem({ comment, index, length }: IcommentList) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div key={comment?._id}>
      {isEditing ? (
        <CommentWrite
          comment={comment}
          isCommentEdit={isEditing}
          setIsCommetEdit={setIsEditing}
        />
      ) : (
        <div className={styles.listBody}>
          <div className={styles.listTitle}>
            <div className={styles.forwardTitle}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div className={styles.forwardTitleText}>{comment?.writer}</div>
              <Rate defaultValue={comment?.rating} />
            </div>
            <div>
              <div className={styles.backTitle}>
                <button onClick={() => setIsEditing(true)}>
                  <Image
                    src={IMAGE_SRC.editImage.src}
                    alt={IMAGE_SRC.editImage.alt}
                  />
                </button>
                <Image
                  src={IMAGE_SRC.closeImage.src}
                  alt={IMAGE_SRC.closeImage.alt}
                />
              </div>
            </div>
          </div>
          <div className={styles.commentText}>{comment?.contents}</div>
          <div className={styles.commentDate}>
            {comment?.createdAt?.split("T")[0].split("-").join(".")}
          </div>
        </div>
      )}
      {index + 1 !== length && <div className={styles.border}></div>}
    </div>
  );
}
