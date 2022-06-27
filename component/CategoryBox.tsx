import { useRouter } from "next/router";
import styled from "styled-components";
import { string } from "yup";
import { useTheme } from "./Context/ThemeContext";
import { BoxContainer } from "./share/BoxContainer";
import { Space } from "./share/Space";
import { ThemedText } from "./ThemedText";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

interface Prop {
  deletepost: ({}) => void;
  post: any;
}
type typeofPost = {
  title: string;
  content: string;
  id: number;
  image: string;
  handledeletePost: () => void;
  handleEditPost: () => void;
  handlePostInfo: () => void;
};

export const CategoryBox = ({ deletepost, post }: Prop) => {
  let t = useTheme();
  const router = useRouter();
  console.log(post);

  return (
    <BoxContainer key={post.id}>
      <PostDetails
        id={post.id}
        title={post.title}
        content={post.content}
        image={post.image}
        handledeletePost={() => deletepost(post.id)}
        handleEditPost={() => {
          router.push({
            pathname: "/posts/editPost",
            query: { id: post.id, slug: post.title },
          });
        }}
        handlePostInfo={() => {
          router.push({
            pathname: "/posts/postInfo",
            query: { id: post.id, slug: post.title },
          });
        }}
      />

      <Space vertical={20} />
    </BoxContainer>
  );
};

const PostDetails = ({
  image,
  id,
  title,
  content,
  handledeletePost,
  handleEditPost,
  handlePostInfo,
}: typeofPost) => {
  let t = useTheme();
  const router = useRouter();
  return (
    <PostWrapper onClick={handlePostInfo}>
      <PostImage>
        {image == "" || image == null ? (
          <img
            src="emptyImage.png"
            alt="postImg"
            width="200px"
            height="200px"
          />
        ) : (
          <img src={image} alt="postImg" height="" width="" />
        )}
      </PostImage>
      <ThemedText
        style={{ width: "100%", justifyContent: "center", display: "flex" }}
      >
        {title}
      </ThemedText>
      <ThemedText
        style={{ width: "100%", justifyContent: "center", display: "flex" }}
      >
        {content}
      </ThemedText>
      <Space vertical={20} />
      <EventLine>
        <EventComponent
          text="ویرایش"
          icon={<RiEdit2Line />}
          style={{
            // fontSize: "22px",
            backgroundColor: t.color.buttonBg,
            color: t.color.bgColor,
            borderRadius: t.borderRadius.small,
            padding: t.padding.small,
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleEditPost}
        />
        <EventComponent
          text="حذف"
          icon={<MdOutlineDelete />}
          style={{
            // fontSize: "22px",
            backgroundColor: t.color.buttonBg,
            color: t.color.bgColor,
            borderRadius: t.borderRadius.small,
            padding: t.padding.small,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handledeletePost}
        />
      </EventLine>
    </PostWrapper>
  );
};

const EventComponent = ({
  onClick,
  text,
  icon,
  style,
}: {
  onClick: () => void;
  text: string;
  icon: any;
  style: {};
}) => {
  return (
    <EventStyle onClick={onClick}>
      <div style={style}>
        <p>{text}</p>
        <span>{icon}</span>
      </div>
    </EventStyle>
  );
};

const PostWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

const EventLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const EventStyle = styled.div`
  display: flex;
  align-items: center;

  p {
    padding-left: 8px;
    margin: 0;
    font-size: 15px;
  }
  span {
    display: flex;
    font-size: 20px;
  }
`;

const PostImage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
