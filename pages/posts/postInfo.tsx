import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useSWR from "swr";
import { config } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { useTheme } from "../../component/Context/ThemeContext";
import Layout from "../../component/Layout";
import MainLayout from "../../component/MainLayout";
import { BoxContainer } from "../../component/share/BoxContainer";
import { SidebarOption } from "../../component/Sidebar/SidebarOption";
import { ThemedText } from "../../component/ThemedText";
import {
  desktop,
  mobile,
  notmobile,
  tablet,
} from "../../component/utils/media";
import { fetcher } from "../../utils/fetcher";

export default function PostInfo(): JSX.Element {
  let t = useTheme();
  const { query }: any = useRouter();
  const { state } = useAppContext();
  const { id, slug }: any = query;
  const { token }: any = state.userInfo;
  console.log(id, slug);

  const { data, error } = useSWR(
    `${config.apiUrl}/api/data/getPost/${id}`,
    fetcher
  );

  if (error) return <div>falied to load</div>;
  console.log(data);
  return (
    <div style={{ display: "flex" }}>
      <SidebarOption />
      <Wrapper>
        <PostWrapper>
          {/* <PostContainer> */}
          <BoxContainer style={{ maxWidth: "600px", padding: "20px" }}>
            {data && (
              <>
                {data.image == null ? (
                  <ImageStyle>
                    <img
                      src="/emptyImage.png"
                      alt="postImg"
                      // width="200px"
                      // height="200px"
                      style={{ border: "1px solid red" }}
                    />
                  </ImageStyle>
                ) : (
                  <ImageStyle>
                    <img
                      src={data.data.image}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                  </ImageStyle>
                )}

                <ThemedText style={{ width: "100%", textAlign: "center" }}>
                  {data.data.title}
                </ThemedText>

                <ThemedText style={{ width: "100%" }}>
                  {data.data.content}
                </ThemedText>
              </>
            )}
          </BoxContainer>
          {/* </PostContainer> */}
          <BoxContainer style={{ maxWidth: "400px" }}>
            <p>‌درباه نویسنده</p>
          </BoxContainer>
        </PostWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 0px auto;
  width: 100%;
  /* max-width: 1200px; */
  overflow-x: hidden;
  overflow-y: auto;
`;

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 60px;
`;

const ImageStyle = styled.div`
  object-fit: cover;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorBox = styled.div`
  width: 100%;
  max-width: 200px;
`;
