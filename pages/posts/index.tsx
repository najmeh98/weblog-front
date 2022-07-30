import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { config, deletePost, deleterequest } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { CategoryBox } from "../../component/CategoryBox";
import MainLayout from "../../component/MainLayout";
import { BoxContainer } from "../../component/share/BoxContainer";
import { Space } from "../../component/share/Space";
import { SidebarOption } from "../../component/Sidebar/SidebarOption";
import {
  desktop,
  largeDescktop,
  mobile,
  notmobile,
  tablet,
} from "../../component/utils/media";

interface State {
  id: number;
  token: string;
}
export default function Posts(): JSX.Element {
  const { posts, dispatch, userInfo } = useAppContext();
  const [postItem, setPostItem] = useState<any | undefined>([]);

  const id: any = userInfo?.id;
  const token: string = userInfo?.token;

  // console.log("posts", posts);

  useEffect(() => {
    try {
      axios
        .post(
          `${config.apiUrl}/api/data/getAllpost/${id}`,
          { id },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          if (result?.status == 200 && result?.data.post) {
            dispatch({
              type: "initial data",
              payload: result?.data?.post,
            });
            console.log(result.data.post);
          } else {
            console.log("error");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      const err = error as AxiosError;
      if ((err.response?.status as number) == 400) {
      }
    }
  }, [dispatch, id, token]);

  const deletepost = (postId: any) => {
    axios
      .delete(`${config.apiUrl}/api/data/deletePost/${postId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "post deleted", payload: postId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainWrapper>
      <SidebarOption />
      <Wrapper>
        <CardsList>
          {posts &&
            posts.length > 0 &&
            posts.map((post: any, index: any) => (
              <CategoryBox key={post.id} post={post} deletepost={deletepost} />
            ))}
        </CardsList>
      </Wrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
`;

const CardsList = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
  grid-gap: 20px;
  margin: 20px;
  ${largeDescktop(css`
    grid-template-columns: repeat(3, 1fr);
  `)}
  ${desktop(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
  ${tablet(css`
    grid-template-columns: repeat(1, 1fr);
  `)} /*

  ${notmobile(css`
    grid-template-columns: repeat(1, 1fr);
  `)} */

  ${mobile(css`
    grid-template-columns: repeat(1, 1fr);
  `)}
`;
