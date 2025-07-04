import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { LoadingOverlay, Box } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { INodeType } from "@/config/types";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

type IProps = {
  nodeType: INodeType;
};
export const NodeDoc: React.FunctionComponent<IProps> = ({ nodeType }) => {
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    import(`@/locale/docs/${i18n.language}/${nodeType}.md`)
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent("<br/>" + t("common.nodeDocNotFound")))
      .finally(() => setLoading(false));
  }, [nodeType]);

  return (
    <Box pos="relative" className="markdown">
      <LoadingOverlay visible={loading} />
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};
