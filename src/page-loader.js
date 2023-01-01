const buildFilepath = (href, outputPath) => {
  const url = new URL(href);
  const hrefWithoutProtocol = url.hostname + url.pathname;

  const dirname = `${outputPath}/`;
  const filename = hrefWithoutProtocol.replace(/[^a-zA-Z0-9]/g, '-');
  const extension = '.html';
  return `${dirname}${filename}${extension}`;
};

export default async (href, outputPath) => ({ filepath: buildFilepath(href, outputPath) });
