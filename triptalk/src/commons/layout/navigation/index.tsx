import styles from "./styles.module.css";
import { useNavigation } from "./hook";
const IMAGE_SRC = {
  tripImage: {
    src: require("@assets/icon.png"),
    alt: "아이콘이미지",
  },
  profileImage: {
    src: require("@assets/profile_image.png"),
    alt: "프로필이미지",
  },
  dropDownImage: {
    src: require("@assets/down_arrow.png"),
    alt: "드롭다운이미지",
  },
};

const NAVIGATION_OPTIONS = [
  {
    router: "",
    name: "트립토크",
  },
  {
    router: "",
    name: "숙박권 구매",
  },
  {
    router: "",
    name: "마이 페이지",
  },
];
import Image from "next/image";

export default function Navigation() {
  const { menuRoute } = useNavigation();
  return (
    <div className={styles.navigationFrame}>
      <div className={styles.navigationBody}>
        <div className={styles.navigationMenu}>
          <Image src={IMAGE_SRC.tripImage.src} alt={IMAGE_SRC.tripImage.alt} />
          {NAVIGATION_OPTIONS.map((option, index) => (
            <div
              key={option.name}
              onClick={menuRoute}
              // TODO - 추후 선택 메뉴에 따라 class변경하는 로직 추가 예정
              className={
                index === 0 ? styles.navigationMenuTextBox : styles.otherClass
              }
            >
              <div className={styles.navigationMenuText}>{option.name}</div>
            </div>
          ))}
        </div>
        <div className={styles.navigationProfile}>
          <Image
            src={IMAGE_SRC.profileImage.src}
            alt={IMAGE_SRC.profileImage.alt}
          />
          <Image
            src={IMAGE_SRC.dropDownImage.src}
            alt={IMAGE_SRC.dropDownImage.alt}
          />
        </div>
      </div>
    </div>
  );
}
