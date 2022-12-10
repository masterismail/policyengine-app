import postJson from "../posts/posts.json";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import useMobile from "../layout/Responsive";
import rehypeRaw from 'rehype-raw'

function MarkdownP(props) {
  return <p style={{ fontSize: 20, marginBottom: 20, paddingLeft: 50, paddingRight: 50 }}>{props.children}</p>;
}

export default function BlogPostPage(props) {
  // The URL will be in the format /uk/blog/post-name
  // We need to extract the countryId and postName from the URL
  const url = window.location.pathname;
  const postName = url.split("/")[3];
  const postData = postJson.find(
    (post) => post.filename.split(".")[0] === postName
  );
  const { title, description, image, filename } = postData;
  const imageSrc = require(`../images/posts/${image}`);
  const markdownFile = require(`../posts/${filename}`);
  const [markdown, setMarkdown] = useState("");
  const mobile = useMobile();
  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [markdownFile]);

  return (
    <Container style={{padding: mobile && 0}}>
      <div style={{ margin: mobile ? 0 : 75, marginTop: mobile ? 20 : 75, marginLeft: mobile ? 20 : 150, marginRight: mobile ? 20 : 150 }}>
        <div style={{ padding: mobile && 20 }}>
          <h1>{title}</h1>
          <h5>{description}</h5>
        </div>
        <img
          src={imageSrc}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            marginBottom: 20,
          }}
          alt="Background"
        />
        <div style={{ padding: mobile && 20 }}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{ 
              p: MarkdownP,
              // Ensure images fit inside the container
              img: ({ src, alt }) => (
                <div style={{ display: "flex", justifyContent: "center", padding: mobile ? 0 : 50 }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: 400,
                    }}
                  />
                </div>
              ),
            }}
          >{markdown}</ReactMarkdown>
        </div>
      </div>
    </Container>
  );
}
