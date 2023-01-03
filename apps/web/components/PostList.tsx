import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';

import blogPosts from '@/posts/generated/blog';
import { isPostDrawerOpenAtom } from '@/state/posts';

export type PostListProps = {
  // TODO: Support expanding only current folder
  initialExpand?: boolean;
};

export const PostList: React.FC<PostListProps> = ({
  initialExpand: _initialExpand,
}) => {
  const { palette } = useTheme();
  const router = useRouter();
  const setPostDrawerOpen = useSetAtom(isPostDrawerOpenAtom);

  return (
    <ListContainer>
      {blogPosts.map((post) => {
        const active = router.asPath === `/w/${post.slug}`;

        return (
          <Link
            href={`/w/${post.slug}`}
            key={`/w/${post.slug}`}
            passHref
            onClick={() => setPostDrawerOpen(false)}
          >
            <ItemContainer>
              <HStack>
                {!!post.emoji && (
                  <EmojiContainer
                    style={{
                      // backgroundColor: active
                      //   ? palette.accents_1
                      //   : palette.accents_1,
                      backgroundColor: palette.accents_1,
                      borderColor: active ? 'white' : palette.accents_2,
                    }}
                  >
                    <span>{post.emoji}</span>
                  </EmojiContainer>
                )}
                <span>
                  <PostTitle
                    style={{
                      // color: active ? palette.accents_7 : palette.accents_3,
                      color: palette.accents_7,
                    }}
                  >
                    {post.title}
                  </PostTitle>
                </span>
              </HStack>
              <span>{post.date}</span>
            </ItemContainer>
          </Link>
        );
      })}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin: 0;
  padding: 24px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: opacity 0.16s ease;

  &:hover {
    opacity: 0.54;
  }
`;
const HStack = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: bold;
    line-height: 160%;
  }
`;
const EmojiContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 2px solid;

  span {
    font-size: 20px;
  }
`;
const PostTitle = styled.h4`
  margin: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
