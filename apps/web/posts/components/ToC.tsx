import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';

import { type Heading } from '../lib/rehype-extract-headings';

type ToCProps = {
  headings: Heading[];
};
export const ToC: React.FC<ToCProps> = ({ headings }) => {
  const { palette } = useTheme();

  return (
    <Container id="toc">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          style={{
            marginLeft: 16 * (heading.rank - 2),
            fontWeight: 500,
          }}
          onClick={(e) => {
            e.preventDefault();
            // smoothly scroll into `#${heading.id}` but with top offset of 82px. do not use scrollIntoView.
            const target = document.getElementById(heading.id);
            if (target) {
              window.scrollTo({
                top: target.offsetTop - 82,
                behavior: 'smooth',
              });
            }
          }}
        >
          {heading.title}
        </a>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
  overflow-y: scroll;

  width: 240px;
  min-width: 240px;

  a {
    color: rgb(102, 102, 102);
    transition: color 0.1s ease-in-out;

    &:hover {
      color: rgb(187, 187, 187);
    }
  }
`;